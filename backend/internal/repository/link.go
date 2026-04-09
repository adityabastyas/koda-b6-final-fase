package repository

import (
	"backend/internal/models"
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type LinkRepository struct {
	DB  *pgxpool.Pool
	rdb *redis.Client
}

func NewLinkRepository(db *pgxpool.Pool, rdb *redis.Client) *LinkRepository {
	return &LinkRepository{
		DB:  db,
		rdb: rdb,
	}
}

func (r *LinkRepository) FindBySlug(slug string) (*models.Link, error) {
	query := `SELECT id, user_id, original_url, slug, created_at, deleted_at FROM links WHERE slug = $1 AND deleted_at IS NULL
	`

	rows, err := r.DB.Query(context.Background(), query, slug)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[models.Link])
	if err != nil {
		return nil, err
	}

	return &user, nil

}

func (r *LinkRepository) Create(input models.LinkInput) error {
	query := `INSERT INTO links (user_id, original_url, slug) VALUES ($1, $2, $3) RETURNING id, user_id, original_url, slug, created_at, deleted_at`

	_, err := r.DB.Exec(context.Background(), query, input.UserId, input.OriginalURL, input.Slug)
	if err != nil {
		return err
	}

	if r.rdb != nil {
		cacheKey := fmt.Sprintf("links:user:%d", input.UserId)
		err := r.rdb.Del(context.Background(), cacheKey).Err()
		if err != nil {
			fmt.Println("REDIS DELETE ERROR:", err)
		} else {
			fmt.Println("[CACHE DELETED]")
		}
	}

	return nil

}

func (r *LinkRepository) GetByUser(userId int) ([]models.Link, error) {
	query := `SELECT id, user_id, original_url, slug, created_at, deleted_at FROM links WHERE user_id=$1 AND deleted_at IS NULL ORDER BY id DESC`

	rows, err := r.DB.Query(context.Background(), query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	links, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Link])
	if err != nil {
		return nil, err
	}

	return links, nil

}

func (r *LinkRepository) Delete(id int, userId int) error {
	query := `UPDATE links SET deleted_at=$1 WHERE id=$2 AND user_id=$3`

	_, err := r.DB.Exec(context.Background(), query, time.Now(), id, userId)
	if err != nil {
		return err
	}

	if r.rdb != nil {
		cacheKey := fmt.Sprintf("links:user:%d", userId)
		err := r.rdb.Del(context.Background(), cacheKey).Err()
		if err != nil {
			fmt.Println("REDIS DELETE ERROR:", err)
		} else {
			fmt.Println("[CACHE DELETED]")
		}
	}

	return nil
}

func (r *LinkRepository) GetAll(userId int) ([]models.Link, error) {

	cacheKey := fmt.Sprintf("links:user:%d", userId)

	if r.rdb != nil {
		valueCache, err := r.rdb.Get(context.Background(), cacheKey).Result()
		if err == nil {
			var links []models.Link
			if err := json.Unmarshal([]byte(valueCache), &links); err == nil {
				return links, nil
			}
		} else if err != redis.Nil {
			fmt.Println("REDIS GET ERROR:", err)
		}
	}

	query := `SELECT id, user_id, original_url, slug, created_at, deleted_at 
			  FROM links 
			  WHERE user_id = $1 AND deleted_at IS NULL`

	rows, err := r.DB.Query(context.Background(), query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	links, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Link])
	if err != nil {
		return nil, err
	}

	if r.rdb != nil && len(links) > 0 {
		data, err := json.Marshal(links)
		if err != nil {
			fmt.Println("JSON MARSHAL ERROR:", err)
		} else {
			err := r.rdb.Set(context.Background(), cacheKey, data, time.Hour).Err()
			if err != nil {
				fmt.Println("REDIS SET ERROR:", err)
			} else {
				fmt.Println("[CACHE SAVED]")
			}
		}
	}

	return links, nil
}
