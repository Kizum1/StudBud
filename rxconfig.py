import reflex as rx


class AppConfig(rx.Config):
    pass


config = AppConfig(
    app_name="app",
    db_url="sqlite:///reflex.db",
    env=rx.Env.DEV,
    tailwind={},
)