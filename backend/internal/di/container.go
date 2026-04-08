package di

import (
	"backend/internal/handlers"
	"backend/internal/repository"
	"backend/internal/routes"
	"backend/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func Container(c *gin.Engine, db *pgxpool.Pool) {

	//user
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	//auth
	authHandler := handlers.NewAuthHandler(userService)

	//link
	linkRepo := repository.NewLinkRepository(db)
	linkService := service.NewLinkService(linkRepo)
	linkHandler := handlers.NewLinkHandler(linkService)

	routes.SetupRoutes(c, authHandler, userHandler, linkHandler)

}
