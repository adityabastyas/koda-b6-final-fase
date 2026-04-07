package routes

import (
	"backend/internal/handlers"
	"backend/internal/lib"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, authHander *handlers.AuthHandler, userHandler *handlers.UserHandler) {

	r.Use(lib.CorsMiddleware())

	//auth
	authGroup := r.Group("/api")
	authGroup.POST("/register", authHander.Register)
	authGroup.POST("/login", authHander.Login)

	// user
	userGroup := r.Group("/users")
	userGroup.Use(lib.CorsMiddleware())
	userGroup.GET("", userHandler.GetAll)

}
