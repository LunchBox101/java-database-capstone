This Spring Boot application uses both MVC and REST controllers. Thymeleaf renders full HTML pages server-side and is used for the Admin and Doctor dashboards, while REST APIs serve all other modules returning JSON. The application interacts with two databases—MySQL for structured, relational data (for patient, doctor, appointment, and admin data) and MongoDB for flexible, varying data (for prescriptions). All controllers route requests through a common service layer which sits between controllers and repositories. MySQL uses JPA entities while MongoDB uses document models.


1. User accesses the Admin Dashboard or Appointment pages.
2. The request is routed to the appropriate Thymeleaf or REST controller.
3. The controller calls the service layer.
4. The service layer calls the needed repository.
5. The repository reaches out to the correct database, whether it is MongoDB or MySQL.
6. The data is retrieved and passed back to the service layer.
7. The service layer returns it to the controller.
8. The controller returns either a rendered HTML page (Thymeleaf) or JSON data (REST) depending on the module.
9. The user sees either a dashboard page, or the data is consumed by the frontend.