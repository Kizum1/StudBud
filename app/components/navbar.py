from app import styles
from app.state import State

import reflex as rx

def navbar_header() -> rx.Component:
    """Navbar header.

    Returns:
        The navbar header component.
    """
    return rx.hstack(
        # Logo
        rx.text(
            "StudBud",
            padding="0 8px",
            font_weight="bold",
            font_size="2em",
            border=styles.border,
            border_radius=styles.border_radius,
            background_color=styles.background_color,
            _hover={

            }
        ),
        padding="1em",
    )

def navbar_item(text: str, icon: str, url: str) -> rx.Component:
    """Navbar item.

    Args:
        text: The text of the item.
        icon: The icon of the item.
        url: The URL of the item.

    Returns:
        rx.Component: The sidebar item component.
    """
    # Whether the item is active.
    active = (State.router.page.path == f"/{text.lower()}") | (
        (State.router.page.path == "/") & text == "Home"
    )

    return rx.link(
            rx.flex(
                rx.image(
                    src=icon,
                    height="2.5em",
                    padding="0.5em",
                ),
                rx.flex(
                    rx.text(
                        text,
                    ),
                    padding_right="6px",
                ),
                bg=rx.cond(
                    active,
                    styles.accent_color,
                    "white",
                ),
                color=rx.cond(
                    active,
                    styles.accent_text_color,
                    styles.text_color,
                ),
                border_radius=styles.border_radius,
                box_shadow=styles.box_shadow,
                width="100%",
                padding_x="1em",
                align="center",
                justify="center",
            ),
            rx.flex(
                href=url,
                width="12%",
            )
        )

def navbar() -> rx.Component:
    """The navbar.

    Returns:
        The sidebar component.
    """
    # Get all the decorated pages and add them to the sidebar.
    from reflex.page import get_decorated_pages

    return rx.flex(
        navbar_header(),
        rx.flex(
            *[
                navbar_item(
                    text=page.get("title", page["route"].strip("/").capitalize()),
                    icon=page.get("image", "/github.svg"),
                    url=page["route"],
                )
                for page in get_decorated_pages()
            ],
            align="center",
        ),
        position="fixed",
        width="100%",
        top="0px",
        z_index="5",
    )