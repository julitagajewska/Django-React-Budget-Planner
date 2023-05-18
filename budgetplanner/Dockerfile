# Base image
FROM python:3 

# Ensure that the python output is sent straight to the terminal
ENV PYTHONUNBUFFERED 1

# Set working directory for the project
WORKDIR /app/api

# Copy file with requirements from local directory
# to the directory inside the image
COPY requirements.txt ./

# Install dependencies inside the image
RUN pip install -r requirements.txt

# Copy remaining files from local directory into the image directory
COPY . ./

# Listen to a specific port
# EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]