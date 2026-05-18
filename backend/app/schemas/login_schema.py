from pydantic import BaseModel


class LoginSchema(BaseModel):

    login_input: str

    password: str