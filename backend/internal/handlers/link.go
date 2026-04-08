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

	userId := ctx.GetInt("user_id")
	input.UserId = userId

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
	id, err := strconv.Atoi(idParam)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "id tidak valid",
		})
		return
	}

	userId := ctx.GetInt("user_id")

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

func (h *LinkHandler) Redirect(ctx *gin.Context) {
	slug := ctx.Param("slug")

	link, err := h.service.FindBySlug(slug)
	if err != nil {
		ctx.JSON(http.StatusNotFound, models.Response{
			Success: false,
			Message: "link tidak ditemukan",
		})
		return
	}

	ctx.Redirect(http.StatusMovedPermanently, link.OriginalURL)
}

func (h *LinkHandler) GetAll(ctx *gin.Context) {

	userId := ctx.GetInt("user_id")

	links, err := h.service.GetAll(userId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "success",
		Result:  links,
	})
}
