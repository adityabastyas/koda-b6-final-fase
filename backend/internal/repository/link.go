package repository

import "github.com/jackc/pgx/v5/pgxpool"

type LinkRepository struct {
	DB *pgxpool.Pool
}

func NewLinkRepository(db *pgxpool.Pool) *LinkRepository {
	return &LinkRepository{
		DB: db,
	}
}

// func(r *LinkRepository) Create()
