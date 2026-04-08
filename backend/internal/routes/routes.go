package routes

import (
	"backend/internal/handlers"
	"backend/internal/lib"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, authHander *handlers.AuthHandler, userHandler *handlers.UserHandler, linkHandler *handlers.LinkHandler) {

	r.Use(lib.CorsMiddleware())

	//auth
	authGroup := r.Group("/api")
	authGroup.POST("/register", authHander.Register)
	authGroup.POST("/login", authHander.Login)

	// user
	userGroup := r.Group("/users")
	userGroup.Use(lib.AuthMiddleware())
	userGroup.GET("/", userHandler.GetAll)

	//link
	linkGroup := r.Group("/api")
	linkGroup.Use(lib.AuthMiddleware())
	linkGroup.POST("/links", linkHandler.Create)
	linkGroup.GET("/links", linkHandler.GetAll)
	linkGroup.DELETE("/links/:id", linkHandler.Delete)

	r.GET("/:slug", linkHandler.Redirect)

}
