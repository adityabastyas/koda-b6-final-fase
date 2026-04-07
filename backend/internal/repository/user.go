package repository

import (
	"backend/internal/models"
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserRepository struct {
	DB *pgxpool.Pool
}

func NewUserRepository(db *pgxpool.Pool) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

func (r *UserRepository) GetAll() ([]models.User, error) {
	query := `SELECT id, email, password_hash, created_at FROM users`

	rows, err := r.DB.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.User])
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	query := `SELECT id, email, password_hash, created_at FROM users WHERE email = $1`

	rows, err := r.DB.Query(context.Background(), query, email)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[models.User])
	if err != nil {
		return nil, err
	}

	return &user, nil

}

func (r *UserRepository) Create(input models.UserRegisterInput) error {
	query := `INSERT INTO users (email, password_hash) VALUES ($1,$2)`

	_, err := r.DB.Exec(context.Background(), query, input.Email, input.Password)
	return err
}
