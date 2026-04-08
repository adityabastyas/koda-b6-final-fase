package service

import (
	"backend/internal/models"
	"backend/internal/repository"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgconn"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

type LinkService struct {
	repo *repository.LinkRepository
}

func NewLinkService(repo *repository.LinkRepository) *LinkService {
	return &LinkService{
		repo: repo,
	}
}

func (s *LinkService) Create(input models.LinkInput) (map[string]any, error) {
	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	slug := input.Slug

	if slug == "" {
		var err error
		slug, err = gonanoid.Generate(alphabet, 6)
		if err != nil {
			return nil, errors.New("gagal generate slug")
		}
	}

	input.Slug = slug

	err := s.repo.Create(input)
	if err != nil {
		var pgErr *pgconn.PgError

		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return nil, errors.New("slug already taken")
		}
		return nil, errors.New("gagal membuat link")
	}

	return map[string]any{
		"original_url": input.OriginalURL,
		"slug":         slug,
		"short_url":    fmt.Sprintf("http://localhost:8888/%s", slug),
	}, nil

}

func (s *LinkService) GetAll(userId int) ([]models.Link, error) {
	return s.repo.GetByUser(userId)
}

func (s *LinkService) Delete(id int, userId int) error {
	return s.repo.Delete(id, userId)
}

func (s *LinkService) FindBySlug(slug string) (*models.Link, error) {
	return s.repo.FindBySlug(slug)
}
