pipeline {
    agent any

    stages {
        stage('Backend Build') {
            steps {
                sh 'cd backend && ./mvnw clean package -DskipTests'
            }
        }

        stage('Frontend Build') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }

        stage('Deploy to Server') {
            steps {
                // Deploy backend JAR to target EC2
                sh '''
                    scp -i /var/lib/jenkins/deploy-key.pem \
                    backend/target/myapp.jar \
                    ec2-user@54.235.17.48:/home/ec2-user/
                '''

                // Deploy frontend build to target EC2
                sh '''
                    scp -i /var/lib/jenkins/deploy-key.pem -r \
                    frontend/dist/* \
                    ec2-user@54.235.17.48:/var/www/html/
                '''
            }
        }
    }
}
