FROM  python:3.9-slim
ENV PYTHONPATH=./utils
COPY ./ /workspace
WORKDIR /workspace
RUN pip install -r requirements.txt
EXPOSE 12288