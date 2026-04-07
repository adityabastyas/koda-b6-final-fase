package service

import (
	"backend/internal/models"
	"backend/internal/repository"
	"errors"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{
		repo: repo,
	}
}

func (s *UserService) Register(input models.UserRegisterInput) error {
	if input.Email == "" || input.Password == "" {
		return errors.New("email & password tidak boleh kosong")
	}

	user, _ := s.repo.FindByEmail(input.Email)
	if user != nil {
		return errors.New("email sudah terdaftar")
	}

	return s.repo.Create(input)
}

func (s *UserService) Login(input models.UserLoginInput) (*models.User, error) {
	if input.Email == "" || input.Password == "" {
		return nil, errors.New("email & password tidak boleh kosong")
	}

	user, err := s.repo.FindByEmail(input.Email)
	if err != nil {
		return nil, errors.New("email tidak ditemukan")
	}

	if user.Password != input.Password {
		return nil, errors.New("password salah")
	}

	return user, nil
}

func (s *UserService) GetAll() ([]models.User, error) {
	return s.repo.GetAll()
}
