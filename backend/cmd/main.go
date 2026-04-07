package main

import (
	"backend/internal/di"
	"backend/internal/lib"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	godotenv.Load()

	lib.ConnectDB()

	r := gin.Default()

	r.GET("swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	di.Container(r, lib.DB)

	r.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))

}
