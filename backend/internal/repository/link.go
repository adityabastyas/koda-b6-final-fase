package repository

import (
	"backend/internal/models"
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type LinkRepository struct {
	DB *pgxpool.Pool
}

func NewLinkRepository(db *pgxpool.Pool) *LinkRepository {
	return &LinkRepository{
		DB: db,
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
	return err

}
