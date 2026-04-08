package handlers

import (
	"backend/internal/lib"
	"backend/internal/models"
	"backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	userService *service.UserService
}

func NewAuthHandler(userService *service.UserService) *AuthHandler {
	return &AuthHandler{
		userService: userService,
	}
}

func (a *AuthHandler) Register(ctx *gin.Context) {
	var input models.UserRegisterInput

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "invalid body",
			Result:  nil,
		})
		return
	}

	if err := a.userService.Register(input); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: err.Error(),
			Result:  nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Register success",
		Result:  nil,
	})
}

func (a *AuthHandler) Login(ctx *gin.Context) {
	var input models.UserLoginInput

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "invalid body",
		})
		return
	}

	results, err := a.userService.Login(input)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	token, _ := lib.GenerateToken(results.Email, results.Id)

	ctx.JSON(http.StatusOK, models.Response{Success: true, Message: "login success", Result: gin.H{
		"user":  results,
		"token": token,
	}})
}
