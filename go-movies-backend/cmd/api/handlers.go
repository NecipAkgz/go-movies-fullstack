package main

import (
	"net/http"
)

// Home is the home page handler
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

	_ = app.writeJSON(w, http.StatusOK, payload)
}

// AllMovies returns all movies
func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.DB.AllMovies()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	_ = app.writeJSON(w, http.StatusOK, movies)

}
