package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/leaanthony/mewn"

	//"github.com/tobolkin8/desktop_todo/pkg/config"
	"github.com/wailsapp/wails"
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

// helloFromClient is a method that handles messages from the app client.
func helloFromClient(c *Client, data interface{}) {
	log.Printf("hello from client! message: %v\n", data)

	// set and write response message
	c.send = Message{Name: "helloFromServer", Data: "hello client!"}
	c.Write()
}
func main() {

	////--------------------------------CONFIG---------------------------------------////
	/* 	conf := config.New()

	   	// Print out environment variables
	   	fmt.Println(conf.GitHub.Username)
	   	fmt.Println(conf.GitHub.APIKey)
	   	fmt.Println(conf.DebugMode)
	   	fmt.Println(conf.MaxUsers)

	   	// Print out each role
	   	for _, role := range conf.UserRoles {
	   		fmt.Println(role)
	   	} */
	////--------------------------------END CONFIG---------------------------------------////

	////--------------------------------DATABASE---------------------------------------////
	//Prod Connection
	//mongoConn := MongoDB{"mongodb+srv://nina:nina8@mongo.oqktw.mongodb.net/mongo?retryWrites=true&w=majority"}

	//localhost connection
	mongoConn := MongoDB{"mongodb://localhost:27017/?readPreference=primary&ssl=false"}

	fmt.Println("mon", mongoConn)
	mongoConn.ConnectToMongo()
	////--------------------------------END DATABASE------------------------------------////
	////--------------------------------ROUTER---------------------------------------////
	// create router instance
	router := NewRouter()
	// handle events with messages named `helloFromClient` with handler
	// helloFromClient (from above).
	router.Handle("helloFromClient", helloFromClient)
	// handle all requests to /, upgrade to WebSocket via our router handler.
	http.Handle("/", router)
	// start server.
	http.ListenAndServe(":4000", nil)
	////--------------------------------END ROUTER---------------------------------------////
	////--------------------------------WAILS---------------------------------------////
	//Configure Wails
	js := mewn.String("./frontend/build/static/js/main.js")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "desktop_todo",
		JS:     js,
		Colour: "#FBFCFC",
	})
	////--------------------------------END WAILS---------------------------------------////

	app.Bind(helloFromClient)
	app.Run()
}
