package main

import (
	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
)

func basic() string {
	return "Ninnnaaa!"
}

func main() {

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
	app.Run()
}
