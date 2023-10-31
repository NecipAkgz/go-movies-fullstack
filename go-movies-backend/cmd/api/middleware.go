package main

import (
	"github.com/rs/cors"
	"net/http"
)

// enableCORS enables CORS for all requests
func (app *application) enableCORS(h http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "X-CSRF-Token", "Authorization", "Set-Cookie"},
		AllowCredentials: true,
	})
	return c.Handler(h)

}
