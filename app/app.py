import reflex as rx
from .models import StudBudUser  # Ensure that the path to your models is correct
import pandas as pd

class State(rx.State):
    """The app state."""
    users: list[StudBudUser] = []

    @rx.var
    def get_users(self) -> list[StudBudUser]:
        """Get all users from the database."""
        with rx.session() as session:
            self.users = session.query(StudBudUser).all()
            return self.users


def user_page():
    """Show a page with a table of users."""
    return rx.table_container(
        rx.table(
            rx.thead(
                rx.tr(
                    rx.th("Name"),
                    rx.th("Email"),
                    rx.th("Age"),
                    rx.th("Gender"),
                    rx.th("School"),
                    rx.th("Major"),
                )
            ),
            rx.tbody(rx.foreach(State.get_users, show_user)),
        ),
        bg="#F7FAFC ",
        border="1px solid #ddd",
        border_radius="25px",
    )


def show_user(user: StudBudUser):
    """Show a user in a table row."""
    return rx.tr(
        rx.td(user.name),
        rx.td(user.email),
        rx.td(user.age),
        rx.td(user.gender),
        rx.td(user.school),
        rx.td(user.major),
    )


def uni_page():
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

app = rx.App(state=State, admin_dash=rx.AdminDash(models=[StudBudUser]))
app.add_page(user_page, "/users")
app.add_page(uni_page, "/uni")

app.compile()
