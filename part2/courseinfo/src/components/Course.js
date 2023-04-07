const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <Total sum = {course.parts.reduce((s,p) => s + p.exercises, 0)} />  
    </div>
    )
  }
  
export default Course
