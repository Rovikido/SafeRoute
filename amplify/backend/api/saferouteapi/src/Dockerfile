FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10

COPY requirements.txt .
RUN pip install -r requirements.txt

# ENV VIRTUAL_ENV=/opt/venv
# RUN python3 -m venv $VIRTUAL_ENV
# ENV PATH="$VIRTUAL_ENV/bin:$PATH"
COPY . .
# Make port 8000 available to the world outside this container
EXPOSE 80

# Run app.py when the container launches
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]

