package main

import(
	"fmt"
	"os"
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "strconv"
	"net/http"
	"time"
)

type Applicant struct {
	ApplicantID int       	`json:"applicant_id"`
	FirstName 	string    	`json:"first_name"`
	LastName    string    	`json:"last_name"`
    Birthday    time.Time   `json:"birth_day"`
	Email      	string    	`json:"email"`
	Phone      	string      `json:"phone"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type Apply struct {
	ApplyID     int       	`json:"apply_id"`
	Position 	string    	`json:"position"`
	File        string    	`json:"file"`
	Stage       string    	`json:"stage"`
	ApplicantID int      `json:"applicant_id"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type Hr struct {
	HrID        int       	`json:"hr_id"`
	FirstName 	string    	`json:"first_name"`
	LastName    string    	`json:"last_name"`
	Email      	string    	`json:"email"`
	Phone      	string      `json:"phone"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type Schedule struct {
	ScheduleId      int       	`json:"schedule_id"`
    FirstName 	    string    	`json:"first_name"`
	LastName        string    	`json:"last_name"`
    TimeS           time.Time 	`json:"time_s"`
    ApplicantID     int         `json:"applicant_id"`
}

type Appuser struct {
    Email      	string    	`json:"email"`
    Password    string      `json:"password"`
    Role        string      `json:"role"`
    IsLogin     bool        `json:"islogin"`
	CreatedAt 	time.Time 	`json:"created_at"`
}

type Blacklist struct {
    FirstName 	    string    	`json:"first_name"`
	LastName        string    	`json:"last_name"`
    Birthday        time.Time   `json:"birth_day"`
    Email      	    string    	`json:"email"`
    History         string    	`json:"history"`
}

func getEnv(key, defaultValue string) string{
	if value := os.Getenv(key); value != ""{
		return value
	}
	return defaultValue 
}

//conect db
var db *sql.DB

func initDB(){
	var err error
	host := getEnv("DB_HOST", "")
	name := getEnv("DB_NAME", "")
	user := getEnv("DB_USER","")
	password := getEnv("DB_PASSWORD","")
	port := getEnv("DB_PORT","")

	conSt := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, name)

	db, err = sql.Open("postgres", conSt)
	if err !=nil {
		log.Fatal("failed to open database")
	}
	
	err = db.Ping()
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	log.Print("successfully connect to database")

	// กำหนดจำนวน Connection สูงสุด
	db.SetMaxOpenConns(25)

	// กำหนดจำนวน Idle connection สูงสุด
	db.SetMaxIdleConns(20)

	// กำหนดอายุของ Connection
	db.SetConnMaxLifetime(5 * time.Minute)
}

func getAllApplicants(c *gin.Context) {
    var rows *sql.Rows
    var err error
    rows, err = db.Query("SELECT applicant_id, first_name, last_name, birth_day, email, phone, created_at FROM applicants")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var applicants []Applicant
    for rows.Next() {
        var applicant Applicant
        err := rows.Scan(&applicant.ApplicantID, &applicant.FirstName, &applicant.LastName, &applicant.Birthday, &applicant.Email, &applicant.Phone, &applicant.CreatedAt)
        if err != nil {
        }
        applicants = append(applicants, applicant)
    }
	if applicants == nil {
		applicants = []Applicant{}
	}

	c.JSON(http.StatusOK, applicants)
}

func getApplicantAuthen(c *gin.Context) {
    var appuser Appuser

    if err := c.ShouldBindJSON(&appuser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        fmt.Println("❌ JSON binding error:", err.Error())
        return
    }

    fmt.Println("✅ Email:", appuser.Email)
    fmt.Println("✅ Password:", appuser.Password)

    var role string
    err := db.QueryRow("SELECT role FROM appuser WHERE email=$1 AND password=$2", appuser.Email, appuser.Password).Scan(&role)
    if err != nil {
        fmt.Println("❌ QueryRow error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
        return
    }

    result, err := db.Exec(`
        UPDATE appuser 
        SET islogin = TRUE 
        WHERE email = $1 AND password = $2
    `, appuser.Email, appuser.Password)

    if err != nil {
        fmt.Println("❌ SQL Update error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัพเดตสถานะการล็อกอินได้"})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        fmt.Println("❌ RowsAffected error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถตรวจสอบผลลัพธ์ของการอัพเดตได้"})
        return
    }

    if rowsAffected == 0 {
        fmt.Println("❌ No rows updated")
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัพเดตสถานะการล็อกอินได้"})
        return
    }

    fmt.Println("✅ Role:", role)

    c.JSON(http.StatusOK, gin.H{"role": role})
}

func getApplicant(c *gin.Context) {
    id := c.Param("id")
    var applicant Applicant

    err := db.QueryRow("SELECT applicant_id, first_name, last_name, birth_day, email, phone FROM applicants WHERE applicant_id = $1", id).
        Scan(&applicant.ApplicantID, &applicant.FirstName, &applicant.LastName, &applicant.Birthday, &applicant.Email, &applicant.Phone)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "applicant not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, applicant)
}


func updateApplicant(c *gin.Context) {
    var ID int
    id := c.Param("id")
    var updateApplicant Applicant

    if err := c.ShouldBindJSON(&updateApplicant); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var updatedAt time.Time
    err := db.QueryRow(
        `UPDATE Applicants
         SET first_name = $1, last_name = $2, birth_day =$3, email = $4, phone = $5
         WHERE id = $6
         RETURNING ID,updated_at`,
        updateApplicant.FirstName, updateApplicant.LastName, updateApplicant.Birthday, updateApplicant.Email,
        updateApplicant.Phone, id,
    ).Scan(&ID, &updateApplicant)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "Applicant not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    updateApplicant.ApplicantID = ID
	updateApplicant.UpdatedAt = updatedAt
	c.JSON(http.StatusOK, updateApplicant)
}

func deleteApplicant(c *gin.Context) {
    id := c.Param("id")

    result, err := db.Exec("DELETE FROM Applicants WHERE applicant_id = $1", id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if rowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Applicant not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Applicant deleted successfully"})
}



func getAllApply(c *gin.Context) {
    var rows *sql.Rows
    var err error

    rows, err = db.Query("SELECT apply_id, position, stage, applicant_id, created_at FROM apply")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var applies []Apply
    for rows.Next() {
        var apply Apply
        err := rows.Scan(&apply.ApplyID, &apply.Position, &apply.Stage, &apply.ApplicantID, &apply.CreatedAt)
        if err != nil {
        }
        applies = append(applies, apply)
    }
	if applies == nil {
		applies = []Apply{}
	}

	c.JSON(http.StatusOK, applies)
}

func getApply(c *gin.Context) {
    id := c.Param("id")
    var apply Apply

    err := db.QueryRow("SELECT apply_id, position, stage, applicant_id, created_at FROM apply WHERE apply_id = $1", id).
        Scan(&apply.ApplyID, &apply.Position, &apply.Stage, &apply.ApplicantID, &apply.CreatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "apply not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, apply)
}

func updateApply(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.Atoi(idParam)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var updateApply Apply
    if err := c.ShouldBindJSON(&updateApply); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var updatedAt time.Time
    err = db.QueryRow(
        `UPDATE Apply
         SET stage = $1, updated_at = NOW()
         WHERE apply_id = $2
         RETURNING updated_at`,
        updateApply.Stage, id,
    ).Scan(&updatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "Apply not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    updateApply.ApplyID = id
    updateApply.UpdatedAt = updatedAt
    c.JSON(http.StatusOK, updateApply)
}


func createApplicant(c *gin.Context) {
    var newApplicant Applicant

    if err := c.ShouldBindJSON(&newApplicant); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var id int
    var createdAt, updatedAt time.Time

    err := db.QueryRow(
        `INSERT INTO applicants (first_name, last_name, birth_day, email, phone)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING applicant_id, created_at, updated_at`,
        newApplicant.FirstName, newApplicant.LastName, newApplicant.Birthday, newApplicant.Email, newApplicant.Phone,
    ).Scan(&id, &createdAt, &updatedAt)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    newApplicant.ApplicantID = id
    newApplicant.CreatedAt = createdAt
    newApplicant.UpdatedAt = updatedAt

    c.JSON(http.StatusCreated, newApplicant)
}

func createAppuser(c *gin.Context) {
    var appUser Appuser

    if err := c.ShouldBindJSON(&appUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var createdAt time.Time

    err := db.QueryRow(
        `INSERT INTO appuser (email, password, role)
         VALUES ($1, $2, $3)
         RETURNING created_at`,
        appUser.Email, appUser.Password, appUser.Role,
    ).Scan(&createdAt)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    appUser.CreatedAt = createdAt

    c.JSON(http.StatusCreated, appUser)
}


func createApply(c *gin.Context) {
    var newApply Apply

    if err := c.ShouldBindJSON(&newApply); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ใช้ RETURNING เพื่อดึงค่าที่ database generate (id, timestamps)
    var apply_id  int
    var createdAt, updatedAt time.Time

    err := db.QueryRow(
        `INSERT INTO Apply (position, applicant_id)
         VALUES ($1, $2)
         RETURNING apply_id, created_at, updated_at`,
        newApply.Position, newApply.ApplicantID,
    ).Scan(&apply_id, &createdAt, &updatedAt)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    newApply.ApplyID = apply_id
    newApply.CreatedAt = createdAt
    newApply.UpdatedAt = updatedAt

    c.JSON(http.StatusCreated, newApply) // ใช้ 201 Created
}

func deleteApply(c *gin.Context) {
    id := c.Param("id")

    result, err := db.Exec("DELETE FROM Apply WHERE apply_id = $1", id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if rowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Apply not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Apply deleted successfully"})
}

func getVerifyBlacklist(c *gin.Context) {
    var blacklist Blacklist

    if err := c.ShouldBindJSON(&blacklist); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        fmt.Println("❌ JSON binding error:", err.Error())
        return
    }

    var dummy int
    err := db.QueryRow(
        "SELECT 1 FROM blacklist WHERE first_name = $1 AND last_name = $2",
        blacklist.FirstName, blacklist.LastName,
    ).Scan(&dummy)

    if err == sql.ErrNoRows {
        // ไม่เจอใน blacklist → ผ่าน
        c.JSON(http.StatusOK, gin.H{"message": "ผ่าน"})
        return
    } else if err != nil {
        // เกิดข้อผิดพลาดอื่น
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถตรวจสอบ blacklist ได้"})
        fmt.Println("❌ DB error:", err.Error())
        return
    }

    // เจอใน blacklist
    c.JSON(http.StatusForbidden, gin.H{"message": "ถูกบล็อคโดย Blacklist"})
}


func getHr(c *gin.Context) {
    id := c.Param("id")
    var hr Hr

    err := db.QueryRow("SELECT hr_id, first_name, last_name, email, phone FROM hr WHERE hr_id = $1", id).
        Scan(&hr.HrID, &hr.FirstName, &hr.LastName, &hr.Email, &hr.Phone)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "hr not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, hr)
}

func getHrbyEmail(c *gin.Context) {
    email := c.Query("email")
    var hr Hr

    err := db.QueryRow("SELECT first_name, last_name, email, phone FROM hr WHERE email = $1", email).
        Scan(&hr.FirstName, &hr.LastName, &hr.Email, &hr.Phone)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "hr not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, hr)
}

func getApplicantProfile(c *gin.Context) {
    email := c.Query("email")
    var applicant Applicant
    var apply1 Apply
    err := db.QueryRow("SELECT a1.first_name, a1.last_name, a1.email, a1.phone, a2.position, a2.stage FROM applicants a1 LEFT join apply a2 on a1.applicant_id=a2.applicant_id WHERE email = $1", email).
        Scan(&applicant.FirstName, &applicant.LastName, &applicant.Email, &applicant.Phone, &apply1.Position, &apply1.Stage)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "applicant not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "applicant": applicant,
        "application": apply1,
    })
}

// @title           Simple API Example
// @version         1.0
// @description     This is a simple example of using Gin with Swagger.
// @host localhost:8080
// @host 127.0.0.1:8080
// @BasePath        /api/v1
func main(){
	initDB()
	defer db.Close()

	r := gin.Default()
    r.Use(cors.New(cors.Config{
       AllowOrigins:     []string{
        "http://127.0.0.1",       // 80
        "http://localhost",       
        "http://127.0.0.1:3000", // 3000
        "http://localhost:3000",
        "http://localhost:8080",  // server port    
        "http://127.0.0.1:8080",
    },
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

	r.GET("/health", func(c *gin.Context) {
		err := db.Ping()
		if err != nil{
			c.JSON(http.StatusServiceUnavailable, gin.H{"message":"unhealty", "error":err})
			return
		}
		c.JSON(200, gin.H{"message": "healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/applicants", getAllApplicants)
	 	api.GET("/applicants/:id", getApplicant)
	 	api.POST("/applicant", createApplicant)
	 	api.PUT("/applicants/:id", updateApplicant)
        api.POST("/applicant/auth", getApplicantAuthen)
	 	api.DELETE("/applicants/:id", deleteApplicant)
        api.GET("/applicants/profile", getApplicantProfile)

        api.GET("/applies", getAllApply)
	 	api.GET("/apply/:id", getApply)
        api.PUT("/upapply/:id", updateApply)
	 	api.POST("/apply", createApply)
        api.POST("/appuser", createAppuser)
	 	api.DELETE("/apply/:id", deleteApply)
        
        api.POST("/blacklist", getVerifyBlacklist)
        api.GET("/hr/:id", getHr)
        api.GET("/hre", getHrbyEmail)
        
    }
	r.Run(":8080")
}