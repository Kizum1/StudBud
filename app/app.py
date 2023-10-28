import reflex as rx
from .models import StudBudUser  # Ensure that the path to your models is correct
import pandas as pd
from typing import List, Any


class r1(rx.State):
    pass


class r2(r1):
    pass


class r3(r2):
    pass





class State(r1):
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


class CoursesState(r2):
    cols: list[Any] = [
        {"title": "Course Number", "type": "str"},
        {"title": "Course Title", "type": "str"},
    ]
    data = [
        ["EECS 101", "Introduction to Electrical Engineering"],
        ["Math 1A", "Calculus"],
        [
            "History 7B",
            "Introduction to the History of the United States: 1865-Present",
        ],
        ["BIO 1A", "General Biology Lecture"],
        ["PSYCH 1", "General Psychology"],
        ["CHEM 1A", "General Chemistry"],
        ["ENGL 10A", "English Literature to 1650"],
        ["PHYSICS 7A", "Physics for Scientists and Engineers"],
        ["POL SCI 1", "Introduction to American Politics"],
        ["SPANISH 1", "Elementary Spanish"],
        ["STATS 20", "Introduction to Probability and Statistics"],
        ["PHILOS 2", "Individual Morality & Social Justice"],
        ["ASTRON 10", "Introduction to General Astronomy"],
        ["ECON 1", "Introduction to Economics"],
        ["GEOG 4", "Cultural Geography"],
        ["ANTHRO 2AC", "Introduction to Archaeology"],
        ["CS 61A", "The Structure and Interpretation of Computer Programs"],
        ["IB 35AC", "Human Biological Variation"],
        ["ART 8", "Introduction to Visual Thinking"],
        ["SOC 1", "Introduction to Sociology"],
        ["MUSIC 20A", "Music in the United States"],
        ["FRENCH 1", "Elementary French"],
        ["THEATER 10", "Fundamentals of Acting I"],
        ["MATH 54", "Linear Algebra & Differential Equations"],
        ["PHYSICS 8B", "Introductory Physics"],
        ["ENVECON 1", "Introduction to Environmental Economics and Policy"],
        ["LS 1", "Life Sciences"],
        ["GWS 10", "Introduction to Gender and Women's Studies"],
        ["CLASSICS 10A", "Introduction to Greek Civilization"],
        ["CS 70", "Discrete Mathematics and Probability Theory"],
        ["PHILOS 25A", "Ancient Philosophy"],
        ["EPS 50", "The Atmosphere"],
        ["JOURN 10", "Principles of Newswriting"],
        ["HISTART 1A", "Introduction to the Visual Arts of the World"],
        ["RHETOR 10", "Public Speaking"],
        ["CHEM 4A", "General Chemistry and Quantitative Analysis"],
        ["GERMAN 1", "Elementary German"],
        ["ARCH 100A", "Fundamentals of Architectural Design"],
        ["ASTRON 7B", "Introductory Astrophysics"],
        ["BIOMEDE 10", "Introduction to Biomedical Engineering"],
        ["MATH 110", "Linear Algebra"],
        ["ESPM 50AC", "Introduction to Culture and Natural Resource Management"],
        ["CHEM 120A", "Physical Chemistry"],
        ["SOCWEL 110", "Introduction to Social Welfare"],
        ["EPS C20", "Earth and Planetary Sciences"],
        ["ENGIN 7","Introduction to Computer Programming for Scientists and Engineers",],
        ["POL SCI 3", "Introduction to Empirical Analysis and Quantitative Methods"],
        ["ECON 101A", "Microeconomic Theory"],
        ["MCELLBI 32", "Introduction to Human Physiology"],
        ["LINGUIS 5", "Introduction to Linguistics"],
        ["CHEM 3A", "Chemical Structure and Reactivity"],
        ["ENGLISH 45A", "English Literature from the Middle Ages to 1650"],
        ["PHILOS 12A", "Introduction to Logic"],
        ["A,RESEC 100", "Principles of Agricultural and Resource Economics"],
    ]
    clicked_data: str = ""

    def click_cell(self, pos):
        col, row = pos
        yield self.get_clicked_data(pos)

    def get_clicked_data(self, pos) -> str:
        self.clicked_data = f"Cell clicked: {pos}"
        return self.clicked_data


class uni(r3):
    cols: list[Any] = [
        {"title": "Rank", "type": "str"},
        {"title": "University", "type": "str"},
    ]
    data = [
        ["1", "Harvard University"],
        ["2", "Stanford University"],
        ["3", "Massachusetts Institute of Technology"],
        ["4", "California Institute of Technology"],
        ["5", "University of Chicago"],
        ["6", "Princeton University"],
        ["7", "Columbia University"],
        ["8", "Yale University"],
        ["9", "University of Pennsylvania"],
        ["10", "University of California--Berkeley"],
        ["11", "University of California--Los Angeles"],
        ["12", "Duke University"],
        ["13", "University of Michigan--Ann Arbor"],
        ["14", "Johns Hopkins University"],
        ["15", "Northwestern University"],
        ["16", "Cornell University"],
        ["17", "University of California--San Diego"],
        ["18", "University of Washington"],
        ["19", "University of California--San Francisco"],
        ["20", "University of Wisconsin--Madison"],
        ["21", "New York University"],
        ["22", "University of California--Santa Barbara"],
        ["23", "Brown University"],
        ["24", "University of North Carolina--Chapel Hill"],
        ["25", "University of Texas--Austin"],
        ["26", "Washington University in St. Louis"],
        ["27", "University of Illinois--Urbana-Champaign"],
        ["28", "Georgia Institute of Technology"],
        ["29", "University of California--Davis"],
        ["30", "University of Southern California"],
        ["31", "University of California--Irvine"],
        ["32", "University of Florida"],
        ["33", "University of Maryland--College Park"],
        ["34", "University of Virginia"],
        ["35", "Boston University"],
        ["36", "University of Rochester"],
        ["37", "University of Colorado--Boulder"],
        ["38", "University of Notre Dame"],
        ["39", "University of Minnesota--Twin Cities"],
        ["40", "Vanderbilt University"],
        ["41", "Rice University"],
        ["42", "Ohio State University"],
        ["43", "University of Pittsburgh"],
        ["44", "University of Arizona"],
        ["45", "Michigan State University"],
        ["46", "Pennsylvania State University"],
        ["47", "Indiana University--Bloomington"],
        ["48", "University of Utah"],
        ["49", "University of California--Santa Cruz"],
        ["50", "University of Iowa"],
        ["51", "Purdue University--West Lafayette"],
        ["52", "Carnegie Mellon University"],
        ["53", "Emory University"],
        ["54", "University of Illinois--Chicago"],
        ["55", "Case Western Reserve University"],
        ["56", "Dartmouth College"],
        ["57", "Tufts University"],
        ["58", "University of Texas--Dallas"],
        ["59", "Yeshiva University"],
        ["60", "University of Miami"],
        ["61", "University of Missouri--Columbia"],
        ["62", "University of Connecticut"],
        ["63", "Brandeis University"],
        ["64", "Texas A&M University--College Station"],
        ["65", "University of Oregon"],
        ["66", "University of Nebraska--Lincoln"],
        ["67", "Syracuse University"],
        ["68", "University of Georgia"],
        ["69", "University of Massachusetts--Amherst"],
        ["70", "University of Tennessee--Knoxville"],
        ["71", "University of Alabama"],
        ["72", "University of Cincinnati"],
        ["73", "University of South Carolina"],
        ["74", "Georgetown University"],
        ["75", "George Washington University"],
        ["76", "Wake Forest University"],
        ["77", "University of Hawaii--Manoa"],
        ["78", "Virginia Tech"],
        ["79", "University of Kansas"],
        ["80", "University of Oklahoma"],
        ["81", "Rutgers University--New Brunswick"],
        ["82", "Stony Brook University--SUNY"],
        ["83", "University of Delaware"],
        ["84", "University of Kentucky"],
        ["85", "University of Vermont"],
        ["86", "Florida State University"],
        ["87", "University of Texas--Arlington"],
        ["88", "University of Houston"],
        ["89", "Louisiana State University--Baton Rouge"],
        ["90", "Iowa State University"],
        ["91", "University of New Mexico"],
        ["92", "University of Arkansas"],
        ["93", "North Carolina State University"],
        ["94", "University of South Florida"],
        ["95", "Oregon State University"],
        ["96", "University of Rhode Island"],
        ["97", "Temple University"],
        ["98", "University of Alaska--Fairbanks"],
        ["99", "Colorado State University"],
    ]
    selected_university: str = ""
    show_university: bool = False

    def select_university(self, pos):
        col, row = pos
        self.selected_university = self.data[row][1]
        self.show_university = True

def display_data_tables():
    return rx.vstack(
        rx.data_editor(
            columns=uni.cols,
            data=uni.data,
            on_cell_clicked=uni.select_university,
            height= "20em",
            search=True,
            sort=True,
        ),
        rx.cond(uni.show_university,
        rx.data_editor(
            columns=CoursesState.cols,
            data=CoursesState.data,
            on_cell_clicked=CoursesState.click_cell,
            height="20em",
            search=True,
            sort=True,
        )
        )

    )


app = rx.App(state=State, admin_dash=rx.AdminDash(models=[StudBudUser]))
app.add_page(user_page, "/users")
app.add_page(display_data_tables, "/uni")
app.compile()
