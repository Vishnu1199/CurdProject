pipeline {
    agent any

    environment {
        EC2_USER = "ec2-user"
        EC2_HOST = "54.235.17.48"
        PEM_KEY = "/var/lib/jenkins/deploy-key.pem"
        FRONTEND_DIR = "frontend"
        BACKEND_DIR = "backend"
    }

    stages {
        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    scp -i ${PEM_KEY} -o StrictHostKeyChecking=no ${BACKEND_DIR}/target/*.jar ${EC2_USER}@${EC2_HOST}:/home/ec2-user/
                    scp -i ${PEM_KEY} -o StrictHostKeyChecking=no -r ${FRONTEND_DIR}/dist/* ${EC2_USER}@${EC2_HOST}:/var/www/html/
                    ssh -i ${PEM_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} 'pkill -f "java -jar" || true && nohup java -jar /home/ec2-user/*.jar > app.log 2>&1 &'
                    """
                }
            }
        }
    }
}
