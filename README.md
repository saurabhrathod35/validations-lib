## Validations-lib
_this lib contains all type of validation in node and angular 6_

## How to use

required object 
```
var object = {
     title: 'number 1';
     type: 'text';
     condition: 'gt';
     currentValue: '1';
     message: 'number 1 must be greater than 25 ';
     params: [25];
     uid:'#1';
}


```
Your output will be 
```
{'result':false,message:'number 1 must be greater than 25'}
```


### describe base object

| Property      | Details                             |
| ------------- | ------------------------------------|
| title         | Validation(field) Title(string)     |
| type          | Field Type(which type of question)  |
| condition     | conditon type like greter than      |
| currentValue  | input (Field input)                 |
| message       | customise your message              |
| params        | compaire values                     |
| uid           | unique identity(optional)           |


### Title
>your field or validation Title

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
| between                | bettween                                                                 | all types except(ranges)
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
| max                    | max eliment                                                              |

Here First perameter is bydefault minimun if you pass two perameter then it consider (between,notbetween case)

in case of between your object like under

```
var object ={
     title: 'number 1';
     type: 'text';
     condition: 'between';
     currentValue: '1';
     message: 'number 1 must be between than 25 to 30';
     params: [25,30];
     uid:'#1';
}
```

