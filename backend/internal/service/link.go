package service

import "backend/internal/repository"

type LinkService struct {
	repo *repository.LinkRepository
}

func NewLinkService(repo *repository.LinkRepository) *LinkService {
	return &LinkService{
		repo: repo,
	}
}
