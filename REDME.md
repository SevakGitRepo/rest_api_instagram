localhost:8080/users/register

        input->json {userName([4; 20], email, password[9; 20] )

        ->if email is exists user can't register 
localhost:8080/users/login

        input->json {email, password}

        ->validation email and password if ok create token
        ->token deleted after 10 seconds
//localhost:8080/photos/upload/:userId

        input->fileData  file

        -> if token valid and format = jpg, jpeg, png, gif upload file and save db
        -> if token invalid format = jpg, jpeg, png, gif upload file but don't save db 
