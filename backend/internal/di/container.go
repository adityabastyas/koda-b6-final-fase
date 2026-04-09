package di

import (
	"backend/internal/handlers"
	"backend/internal/repository"
	"backend/internal/routes"
	"backend/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func Container(c *gin.Engine, db *pgxpool.Pool, rdb *redis.Client) {

	//user
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	//auth
	authHandler := handlers.NewAuthHandler(userService)

	//link
	linkRepo := repository.NewLinkRepository(db, rdb)
	linkService := service.NewLinkService(linkRepo)
	linkHandler := handlers.NewLinkHandler(linkService)

	routes.SetupRoutes(c, authHandler, userHandler, linkHandler)

}
