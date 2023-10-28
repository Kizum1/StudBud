from app.templates import template
import pandas as pd
import reflex as rx

@template(route="/uni", title="Universities")
def uni() -> rx.Component:



    uni_data = pd.read_csv("app/universities.csv")


    return rx.vstack(
        rx.data_table(
            data=uni_data[["Rank", "University"]],
            pagination=True,
            search=True,
            sort=True,
        ),
        rx.heading("Settings", font_size="3em"),
        rx.text("Welcome to Reflex!"),
        rx.text(
            "You can edit this page in ",
            rx.code("{your_app}/pages/settings.py"),
        )
    )