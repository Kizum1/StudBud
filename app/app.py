import reflex as rx
from .models import StudBudUser

class State(rx.State):
    """The app state."""

    name: str = ""
    email: str = ""
    age: int = 0
    gender: str = "Other"
    school: str = ""
    major: str = ""
    users: list[StudBudUser] = []

    def add_user(self):
        """Add a StudBudUser to the database."""
        with rx.session() as session:
            if session.query(StudBudUser).filter_by(email=self.email).first():
                return rx.window_alert("User already exists")
            session.add(
                StudBudUser(
                    name=self.name,
                    email=self.email,
                    age=self.age,
                    gender=self.gender,
                    school=self.school,
                    major=self.major,
                )
            )
            session.commit()
        return rx.window_alert(f"User {self.name} has been added.")
    

    def user_page(self):
        """The user page."""
        return rx.redirect("/")

    def add_user_page(self):
        """The add user page."""
        return rx.redirect("/add_user")

    def delete_user(self, email: str):
        """Delete a StudBudUser from the database."""
        with rx.session() as session:
            user_to_delete = session.query(StudBudUser).filter_by(email=email['email']).first()
            if user_to_delete:
                session.delete(user_to_delete)
                session.commit()
                return rx.window_alert(f"User with email {email} has been deleted.")
            else:
                return rx.window_alert(f"No user found with email {email}.")



    @rx.var
    def get_users(self) -> list[StudBudUser]:
        """Get all users from the database."""
        with rx.session() as session:
            return session.query(StudBudUser).all()


def show_user(user: StudBudUser):
    """Show a user in a table row."""
    return rx.tr(
        rx.td(user.name),
        rx.td(user.email),
        rx.td(user.age),
        rx.td(user.gender),
        rx.td(user.school),
        rx.td(user.major),
        rx.td(
            rx.button(
                "Delete",
                on_click=lambda: State.delete_user(user),
                bg="red",
                color="white",
            )
        ),
    )


def add_user():
    """Add a StudBudUser to the database."""
    return rx.center(
        rx.vstack(
            rx.heading("Add StudBud User"),
            rx.input(placeholder="Name", on_blur=State.set_name),
            rx.input(placeholder="Email", on_blur=State.set_email),
            rx.input(placeholder="Age", on_blur=State.set_age),
            rx.select(["Male", "Female", "Other"], placeholder="Gender", on_change=State.set_gender),
            rx.input(placeholder="School", on_blur=State.set_school),
            rx.input(placeholder="Major", on_blur=State.set_major),
            rx.button("Submit User", on_click=State.add_user),
        ),
        padding="1em",
    )


def index():
    """The main page."""
    return rx.center(
        rx.vstack(
            rx.heading("StudBud Users"),
            rx.button("Add User", on_click=State.add_user_page, bg="blue", color="white"),
            rx.table_container(
                rx.table(
                    rx.thead(
                        rx.tr(
                            rx.th("Name"),
                            rx.th("Email"),
                            rx.th("Age"),
                            rx.th("Gender"),
                            rx.th("School"),
                            rx.th("Major"),
                            rx.th("Delete"),
                        )
                    ),
                    rx.tbody(rx.foreach(State.get_users, show_user)),
                ),
                bg="#F7FAFC ",
                border="1px solid #ddd",
                border_radius="25px",
            ),
        ),
        padding="1em",
    )


# Add state and page to the app.
app = rx.App(state=State, admin_dash=rx.AdminDash(models=[StudBudUser]))
app.add_page(index)
app.add_page(add_user, "/add_user")
app.compile()
