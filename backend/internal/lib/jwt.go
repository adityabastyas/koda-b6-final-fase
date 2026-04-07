package lib

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("secret123")

func GenerateToken(email string) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Minute * 15).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(secretKey)
}
