package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8000

type application struct {
	Domain string
}

func main() {
	// set application config
	var app application

	// read from command line

	// connect to the database
	app.Domain = "example.com"

	// start the server
	fmt.Println("Starting application on port: ", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
