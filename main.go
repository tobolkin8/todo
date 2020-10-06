package main

import (
	"log"
	"net/http"

	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
)

func basic() string {
	return "Ninnnaaa!"
}

// helloFromClient is a method that handles messages from the app client.
func helloFromClient(c *Client, data interface{}) {
	log.Printf("hello from client! message: %v\n", data)

	// set and write response message
	c.send = Message{Name: "helloFromServer", Data: "hello client!"}
	c.Write()
}
func main() {

	// create router instance
	router := NewRouter()

	// handle events with messages named `helloFromClient` with handler
	// helloFromClient (from above).
	router.Handle("helloFromClient", helloFromClient)

	// handle all requests to /, upgrade to WebSocket via our router handler.
	http.Handle("/", router)

	// start server.
	http.ListenAndServe(":4000", nil)

	js := mewn.String("./frontend/build/static/js/main.js")
	css := "" //mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "desktop_todo",
		JS:     js,
		CSS:    css,
		Colour: "#FBFCFC",
	})
	app.Bind(basic)
	app.Bind(helloFromClient)
	app.Run()
}
