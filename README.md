# Full-Stack Application Deployment and Management on Kubernetes


### **Project Overview**

In this project, I will deploy a full-stack application on a Kubernetes cluster, which includes a Node.js backend, a MongoDB database, and an Nginx frontend. You will use Docker for containerization, Kubernetes for orchestration, ConfigMaps for environment management, and Persistent Volumes for data storage. This project will provide hands-on experience in deploying, managing, and scaling a complete application on Kubernetes.


### Instructions
# Setup:
- Full stack namespace creation for the project:
    kubectl create namespace fullstack-app

# Step 1: Frontend (Nginx) Server
- Create a Dockerfile for the Nginx server that serves static files:
    - Created static directory and simple HTML, CSS and JS page.
    - Create a Dockerfile outside the static directory. 
    - Build the docker image and test it in the local environment: 
    - Test it.
    - Clean docker environment:
    - Push the image to the docker hub.

# Step 2: Backend (Node.js) and Database (MongoDB) Setup:
    - Create a Node.js API server that connects to MongoDB.
        - mkdir mongo-node-api
        - cd mongo-node-api
        - npm init -y
        - npm install express mongoose dotenv

    - Create a Dockerfile to containerize the Node.js application.
    - Use environment variables to configure the MongoDB connection string.
    - Build and push the Docker image to Docker Hub.
        - docker build -t prabeshkalika/node-backend .
        - docker push prabeshkalika/node-backend

# Step3: Database Setup (MongoDB):
    - Use the official MongoDB image from Docker Hub. Configure MongoDB to use a persistent volume for data storage. Write a deployment manifest for MongoDB that uses the Persistent Volume and ConfigMap. Expose MongoDB using a ClusterIP service.
        - kubectl apply -f mongo-deployment.yml 
        - kubectl apply -f mongo-service.yml        

# Step 4: Deploy Node.js Backend:
    - Setup : Write a deployment manifest for the Node.js API server. Use a ConfigMap to manage environment variables (e.g., MongoDB URI, server port). Expose the backend using a ClusterIP service.
        - kubectl apply -f node-deployment.yml
        - kubectl apply -f node-service.yml


# Step 5: Nginx deployment:
    Write a deployment manifest for Nginx. Use ConfigMaps to configure Nginx, if necessary. Expose Nginx using a NodePort service.
        - kubectl apply -f nginx-deployment.yml
        - kubectl apply -f nginx-service.yml
    - Exposing nginx in the localhost:
        - minikube service nginx --url

# Step 6: Verifying deployment and other helpful commands:
- kubectl get deployments
- kubectl get services
- minikube logs
- kubectl get pods -o wide
- kubectl logs <pod-name>
- kubectl describe pod <pod-name>
- kubectl delete pod <pod-name>


# Step 7: Application Management:
- Scaling: Scale the Node.js and Nginx deployments to handle more traffic using kubectl scale.
    # Get current configuration.
      kubectl get deployments --namespace=fullstack-app    # Specifying scaling configuration.
    - kubectl scale deployment node-api --replicas=3
    - kubectl scale deployment nginx --replicas=3
    # Checks status of deployed resources.
    - kubectl rollout status deployment node-api
    - kubectl rollout status deployment nginx

- Monitoring: Use kubectl logs to monitor the logs of each container. Describe and inspect resources to ensure everything is running smoothly.
    - kubectl logs <pod-name>
    - kubectl describe pod <pod-name>
    - kubectl get pods -o wide
    - minikube addons enable metrics-server  
    - kubectl top pods # Enabled via minikube.
    
- Port Forwarding: Use kubectl port-forward to access the MongoDB service locally for debugging.
    - kubectl port-forward service/mongo-service 27017:27017 -n fullstack-app

- Interacting with MongoDB: Connect to MongoDB using the Mongo shell to insert, retrieve, and manage data.
    - mongo mongodb://localhost:27017

- Rolling Updates: Perform rolling updates on the Node.js and Nginx deployments to simulate application updates with zero downtime.
    - kubectl rollout undo deployment/node-api
