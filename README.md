## Validations-lib
_this lib contains all type of validation in node and angular 6_

## How to use

### Javascript

```
var validationsLib=required('validations-lib');
```
### Angular app
```
import {Validation} from 'validations-lib'
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

>pass your object into this **validations-lib** 
#### javascript 
```ruby

var result= validationsLib.Validation.validate(object)

```
#### typescript node 8+
```ruby 
var result= Validation.validate(object)
```

Your output will be 
```ruby
{'result':false,message:'number 1 must be greater than 25'}
```


### Describe base object

| Property      | Details                             |
| ------------- | ------------------------------------|
| title         | Validation(field) Title(string)     |
| type          | Field Type(which type of question)  |
| condition     | conditon type like greter than      |
| currentValue  | input (Field input)                 |
| message       | customise your message              |
| params        | compaire values                     |
| required      | required field                      |
| uid           | unique identity(optional)           |



### Title
_ your field or validation Title _

### Type(s)

| Types                  | Details                                                                  |     
| ---------------------- | -------------------------------------------------------------------------|
| text                   | default text type                                                        |
| number                 | allows only numbers                                                      |
| multiselect-dropdown   | allows singal dymantion arrray of elements                               |
| date                   | date format (moment js)                                                  |
| time                   | time format (moment js)                                                  |
| datetime               | allow date with time                                                     |
| timeRange              | allow array of time [time1,time2] or [[time1},{time2]]                   |
| dateRange              | allow array of date [date1,date2] or [[date1,date2]]                     |
| dateTimeRange          | allow array of date [datetime1,datetime2] or [[datetime1],[datetime2]]   |

### Condition(s)

| Types                  | Details                                                                  | Support    
| ---------------------- | -------------------------------------------------------------------------|----------
| gt                     | greter then                                                              | all types
| lt                     | less then                                                                | all types
| eq                     | equal to                                                                 | all types
| lte                    | less then equal to                                                       | all types
| gte                    | grater then equal to                                                     | all types
| notEqual               | not equal to                                                             | all types
| between                | between                                                                 | all types except(ranges)
| notBetween             | notBetween                                                               | all types except(ranges)
| sameAs                 | this condition only for text (asset match)                               | text
| notSame                | this condition only for text (asset not match)                           | text
| contains               | text contains                                                            | text
| notContains            | text not contains                                                        | text
| startwith              | text start with                                                          | text
| endswith               | text ends with                                                           | text


### Message
it allow for customised your validation message otherwise **validations-lib** provide default message

### Params
base of **validations-lib** here you can pass maximumm 2 perameters 

| Types                  | Details                                                                  |     
| ---------------------- | -------------------------------------------------------------------------|
| min                    | minimun element                                                          |
| max                    | max element                                                              |

### Required
if you pass bool in this object then it will give you appropriate message with uid

### uid (Unique ID)
this property contains unique identification of object 

### Example

Here First perameter is bydefault minimun if you pass two perameter then it consider (between,notbetween case)

in case of between your object like under

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

# Multiple Field validation
_if you hase bunch of field for validation in singal object then have to give **uid** in question and entry object_

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
And Your Final input object like under
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
## Compaire with anther question 
> if you want to compaire your question with anther question then spacify **uid** in params,
then your object like this
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
**result** key all field is valid or not
```ruby
{
'#1':{'result':false,message:'number 1 must be between than 25 to 30'},
'#2':{'result':false,message:'number 2 must be between than 25 to 30'},
'#3':{'result':false,message:'number 3 must be between than 20 to 30'},
'#4':{'result':false,message:'number 4 must be between than 25 to 40'}
'result':false
}

```
### for other requirements  
_feelfree mail me on saurabhratohd35@gmail.com_

### github URL
https://github.com/saurabhrathod35/validations-lib
