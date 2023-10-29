package main

import (
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Go movies up and running!",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	highlanderReleaseDate, _ := time.Parse("2006-01-02", "1906-03-07")
	highlander := models.Movie{
		ID:          1,
		Title:       "Highlander",
		ReleaseDate: highlanderReleaseDate,
		MPAARating:  "R",
		RunTime:     116,
		Description: "An immortal Scottish swordsman must confront the last of his immortal opponents, a murderously brutal barbarian who lusts for the fabled 'Prize'",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
	movies = append(movies, highlander)

	inceptionReleaseDate, _ := time.Parse("2006-01-02", "2010-07-16")
	inception := models.Movie{
		ID:          2,
		Title:       "Inception",
		ReleaseDate: inceptionReleaseDate,
		MPAARating:  "PG-13",
		RunTime:     148,
		Description: "A thief who enters the dreams of others to steal their secrets is offered a final job that involves planting an idea into the mind of a CEO.",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
	movies = append(movies, inception)

	out, err := json.Marshal(movies)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)

}
