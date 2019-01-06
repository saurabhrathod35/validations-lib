## Validations-lib
_This library contains all types of validations required for Node and Angular 6_

## How to use it:

### Javascript

```ruby
var validationsLib=required('validations-lib');
```
### Angular app
```ruby
import {Validation,FieldValidation} from 'validations-lib'
```
required object 
```ruby
var object = {
     title: 'number 1',
     type: 'text',
     required:true,
     condition: 'gt',
     currentValue: '1',
     message: 'number 1 must be greater than 25 ',
     params: [25],
     uid:'#1'
}
```

>Pass your object into this **validations-lib** 
#### javascript 
```ruby

var result= validationsLib.Validation.validate(object)

```
#### typescript node 8+
```ruby 
var result= Validation.validate(new FieldValidation(object))
```

Your output will be 
```ruby
{'result':false,message:'number 1 must be greater than 25'}
```


### Description of the base object

| Property      | Details                             | Default |
| ------------- | ------------------------------------|---------|
| title         | Validation(field) Title(string)     |blank    |
| type          | Field Type(type of question)        |text     | 
| condition     | Conditons like greater than         |blank    | 
| currentValue  | Input (Field input)                 |blank    |
| message       | Customise your message              |lib generated|
| params        | Compare the values                  |blank|
| required      | Required fields                     |false|
| uid           | Unique identifier(numeric-optional) |blank|



### Title
Your field or Validation Title

### Input Type(s)

| Types                  | Details                                                                                |     
| ---------------------- | ---------------------------------------------------------------------------------------|
| text                   | By default it is text type                                                             |
| number                 | Allows only number type                                                                |
| multiselect-dropdown   | Allows only single dimensional arrray of elements                                      |
| date                   | Date format (moment js)                                                                |
| time                   | Time format (moment js)                                                                |
| datetime               | Allow date with time                                                                   |
| timeRange              | Allows an array of time [time1,time2] or [[time1},{time2]]                             |
| dateRange              | Allows an array of date [date1,date2] or [[date1,date2]]                               |
| dateTimeRange          | Allows an array of date with time [datetime1,datetime2] or [[datetime1],[datetime2]]   |

### Condition(s) applied on fields

| Types                  | Details                                                                  | Support    
| ---------------------- | -------------------------------------------------------------------------|----------
| gt                     | Greater than                                                             | all types
| lt                     | Less than                                                                | all types
| eq                     | Equal to                                                                 | all types
| lte                    | Less than or equal to                                                    | all types
| gte                    | Greater than or equal to                                                 | all types
| notEqual               | Not equal to                                                             | all types
| between                | Between                                                                  | all types except(ranges)
| notBetween             | Not Between                                                              | all types except(ranges)
| sameAs                 | This condition is only for text type (String match)                      | text
| notSame                | This condition is only for text type (String does not match)             | text
| contains               | Text contains (String that contains specific string of character/s)      | text
| notContains            | Text not contains (String that does not contain specific string of character/s)                                                       | text
| startwith              | Text start with (String starting with a particular character/s)          | text
| endswith               | Text ends with (String starting with a particular character/s)           | text


### Message
One can have their own customised validation messages otherwise **validations-lib** provides default messages as well.

### Params
Based on the **validations-lib** here you can pass maximumm 2 parameters as mentioned below 

| Types                  | Details                                                                  |     
| ---------------------- | -------------------------------------------------------------------------|
| min                    | Minimun number of elements                                               |
| max                    | Maximum number of elements                                               |

If one wants to set min value and max value one by one (one after the other) then one can use **setParams()** method with one argument

### Required (optional)
If you pass a boolean value in this object then it will give you appropriate message accordingly with uid otherwise by default it will return false

### uid (Unique ID)
This property contains unique identification of an object. 

### Example

Here first parameter is by default minimum. If you pass two parameters then it considers (between, notbetween case).

In case of between your object will be something like as shown below:

```ruby
var object ={
     title: 'number 1',
     type: 'text',
     required:true,
     condition: 'between',
     currentValue: '1',
     message: 'number 1 must be between than 25 to 30',
     params: [25,30],
     uid:'#1'
}
```

# Multiple Field Validation
_If you have a bunch of fields for validation in a single object, then we have to providee **uid** in question as well as entry object_

## Example
```ruby
var object = [
  {
       title: 'number 1',
       type: 'text',
       required:true,
       condition: 'between',
        message: 'number 1 must be between than 25 to 30',
       params: [25,30],
       uid:'#1'
  },
  {
       title: 'number 2',
       type: 'text',
       required:true,
       condition: 'between',
       message: 'number 2 must be between than 25 to 30',
       params: [25,30],
       uid:'#2'
  },
  {
       title: 'number 3',
       type: 'text',
       required:true,
       condition: 'between',
        message: 'number 3 must be between than 20 to 30',
       params: [20,30],
       uid:'#3'
  },
  {
       title: 'number 4',
       type: 'text',
       required:true,
       condition: 'between',
        message: 'number 4 must be between than 25 to 30',
       params: [25,30],
       uid:'#4'
  }
]  
```
And your final input object will look something like below:
```ruby
var entry = {
'#1':1,
'#2':2,
'#3':40,
'#4':6
}
```

```ruby
var result = validationsLib.validateWithGroup(entry,object)
```

## Output 
```ruby
{
'#1':{'result':false,message:'number 1 must be between than 25 to 30'},
'#2':{'result':false,message:'number 2 must be between than 25 to 30'},
'#3':{'result':false,message:'number 3 must be between than 20 to 30'},
'#4':{'result':false,message:'number 4 must be between than 25 to 30'}
}
```
## Comparison with another question 
> If you want to compare your question with another question then specify **uid** in params,
then your object will look something like this
```ruby
 {
       title: 'number 4',
       type: 'text',
       required:true,
       condition: 'between',
        message: 'number 4 must be between than 25 to #3 value',
       params: [25,'#3'],
       uid:'#4'
  }
  
  ```
### output
**result** Key 'all' field is valid or not
```ruby
{
'#1':{'result':false,message:'number 1 must be between than 25 to 30'},
'#2':{'result':false,message:'number 2 must be between than 25 to 30'},
'#3':{'result':false,message:'number 3 must be between than 20 to 30'},
'#4':{'result':false,message:'number 4 must be between than 25 to 40'}
'result':false
}

```
### For any other requirements  
_Feel free to mail me at saurabhrathod35@gmail.com_

### github URL
https://github.com/saurabhrathod35/validations-lib
