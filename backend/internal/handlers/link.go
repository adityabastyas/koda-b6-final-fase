package handlers

import (
	"backend/internal/models"
	"backend/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type LinkHandler struct {
	service *service.LinkService
}

func NewLinkHandler(service *service.LinkService) *LinkHandler {
	return &LinkHandler{
		service: service,
	}
}

func (h *LinkHandler) Create(ctx *gin.Context) {
	var input models.LinkInput

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "invalid body",
		})
		return
	}

	input.UserId = 1

	result, err := h.service.Create(input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "link berhasil di buat",
		Result:  result,
	})
}

func (h *LinkHandler) Delete(ctx *gin.Context) {

	idParam := ctx.Param("id")
	id, _ := strconv.Atoi(idParam)

	userId := 1

	if err := h.service.Delete(id, userId); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "deleted",
	})
}
