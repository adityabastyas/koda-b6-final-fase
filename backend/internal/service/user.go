package service

import (
	"backend/internal/lib"
	"backend/internal/models"
	"backend/internal/repository"
	"errors"

	"github.com/jackc/pgx/v5"
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

	hashedPassword, err := lib.HashPassword(input.Password)
	if err != nil {
		return errors.New("gagal hash password")
	}
	input.Password = hashedPassword

	return s.repo.Create(input)
}

func (s *UserService) Login(input models.UserLoginInput) (*models.User, error) {
	if input.Email == "" || input.Password == "" {
		return nil, errors.New("email & password tidak boleh kosong")
	}

	user, err := s.repo.FindByEmail(input.Email)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, errors.New("email atau password salah")
		}
		return nil, errors.New("terjadi kesalahan pada server")
	}

	valid, err := lib.VerifyPassword(input.Password, user.Password)
	if err != nil {
		return nil, errors.New("terjadi kesalahan pada server")
	}

	if !valid {
		return nil, errors.New("email atau password salah")
	}

	return user, nil
}

func (s *UserService) GetAll() ([]models.User, error) {
	return s.repo.GetAll()
}
