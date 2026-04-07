package repository

import (
	"backend/internal/models"
	"context"

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

func (r *LinkRepository) Create(input models.LinkInput) error {
	query := `INSERT INTO links (user_id, original_url, slug) VALUES ($1, $2, $3) RETURNING id, user_id, original_url, slug, created_at, deleted_at`

	_, err := r.DB.Exec(context.Background(), query, input.OriginalURL, input.Slug)
	return err

}
