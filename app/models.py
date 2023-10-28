import reflex as rx


class StudBudUser(rx.Model, table=True):
    """The customer model."""

    name: str
    email: str
    age: int
    gender: str
    school: str
    major: str