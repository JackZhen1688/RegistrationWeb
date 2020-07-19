## RegistrationWeb (Web Application Framework)
==============================================
Registration Web Applicaation uses the Angular 6 Javascript framework to build up the frontend. it includes the Bootstrap for mobilizeing. CSS for looking feel. HTML5 for layout.
## Angular Environment Setup & Test
   1. Setup
      https://www.tutorialspoint.com/angular6/angular6_environment_setup.htm
   2. Test Command
      a) node -v       (It's NodeJS server which execute the JavaScript+TypeScript)
      b) npm  -v       (Node Package Manager, It's a tool of NodeJS)
      c) ng  --version (Generator: CLI(Command Line Interface) 
      c) tsc --version (TypeScript Converter: TypeScript--> JavaScript)

## RegistrationWeb code setup in Visual Studio Code
   Go to Top menu
   1. File/Open Folder...
      Select the RegistrationWeb which you have cloned from the GITHUB.
   2. Terminal/New Terminal
      Execute the following installation in New Terminal
      a) npm install     
      b) npm install -g @angular/cli         (sudo)
      c) npm install -g typescript
      d) npm install bootstrap --save
         copy @import '~bootstrap/dist/css/bootstrap.min.css'; to styles.css
      e) npm install --save font-awesome angular-font-awesome
         copy @import "~font-awesome/css/font-awesome.css"; to styles.css
      f) npm install --save @angular/cdk @angular/material @angular/animations hammers
         copy @import "~@angular/material/prebuilt-themes/indigo-pink.css"; to style.css
      g) npm install @material-extended/mde    
	   h) npm install ngx-mask --save 
      i) npm install ngx-show-hide-password --save 
      j) npm install @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons --save
      k) matIcon:
         copy @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

      p.s: 
      CORS solution:
        cd "C:\Program Files (x86)\Google\Chrome\Application"
        chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
        exist

        cors chrome plugin
        
        open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security
========================================================================
Value of DetailForm JSON has to match Java DTO output
i.e.                                           @Data
  this.detailForm.patchValue({                 public class PersonDTO {
      userId: this.formBuilder.control(''),    private String userId;
========================================================================
[
  {
	"id": 1,
	"userId": "JZHEN",
	"password": "123",
	"firstName": "Jack",
	"lastName": "Zhen",
	"ssn": 123456789,
	"birthDay": "10/26/1996",
	"personType": {
		"id": 1,
		"type": "Student"
	},
	"emgContact": {
		"id": 1,
		"contactName": "Karena",
		"contactRelation": "Spouse",
		"contactPhone": "(701) 324-2234",
		"contactEmail": "karena@gmail.com"
	},
    "phones":
      [{"id":1,
        "phone":"(212) 123-3456",
        "phoneType":{"id":1,"type":"Home"}
        },
        {"id":2,
        "phone":"(609) 456-7896",
        "phoneType":{"id":2,"type":"Cell"}
      }]
  }
]
----------------------------------------------------------------------------
constructDetailForm() {
    this.detailForm = this.formBuilder.group({
      userId: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      confirmPassword: this.formBuilder.control('',[matchValues('password')]),
      personType: this.formBuilder.group({
          id: [''],
          type: [''],
        }),
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      ssn: this.formBuilder.control('', [Validators.required]),
      birthDay: this.formBuilder.control(''), //new Date()
      datepicker: this.formBuilder.control(''),
      emgContact: this.formBuilder.group({
          contactName: this.formBuilder.control(''),
          contactRelation: this.formBuilder.control(''),
          contactPhone: this.formBuilder.control(''),
          contactEmail: this.formBuilder.control('',[Validators.email] ),
        }),
      phoneArray: this.constructPhoneArray(),
    });
}
-----------------------------------------------------------------------------
@Data
public class PersonDTO {

	private Long id;     
    //private Long pertId; <-- Ignore mapping column
	private String userId;
	private String password;
	private String firstName;
	private String lastName;
	private Long ssn;
	@JsonDeserialize(using = CustomDateDeserializer.class)     // java.util.Date object with JSON format
	@JsonSerialize(using   = CustomDateSerializer.class)
	private Date birthDay;
	private PersonTypeDTO personType;
	private EmgContactDTO emgContact; 
   private List<PhonesDTO> phones = Lists.newArrayList();  
    
}
======================================================================

    This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Development Code
   1. Commands
      a) ng g c $path/ComponentName     (g: global   $path:/src/app/..)
      b) ng g s $path/ServiceName
      c) ng g d $path/DirectiveName
      d) ng g m $path/ModuleName
      
## Development server

    Run `ng serve` for a dev server. Navigate to `http://localhost:4200/RegistrationWeb`. The app will automatically reload if you change any of the source files.

## Code scaffolding

    Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

    Run `ng build --base-href=/RegistrationWeb/` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

    Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

    To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
