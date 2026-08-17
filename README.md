# validations-lib 🚦

**One object in. One `{result, message, code}` out.**

No chained builders, no decorators, no schema DSL to learn on a Sunday. You describe a field as plain data — what it is, what it must satisfy — and the library tells you whether the value passes and what to say when it doesn't. Works in Node and in Angular (6+).

Written because the fourth time you hand-write "Age must be greater than or equal to 18", something inside you dies. 💀

```bash
npm install validations-lib
```

---

## ⏱️ 30 seconds

```js
const { Validation } = require('validations-lib');

Validation.validate({
  title: 'Age',
  type: 'number',
  condition: 'gte',
  currentValue: 17,
  params: [18]
});
// => { result: false, message: 'Age must be greater than or equal to 18', code: 'GTE_ERROR' }
```

You didn't write that message. You can, though — set `message` and yours wins, because the library has no ego about prose.

TypeScript / Angular:

```ts
import { Validation, FieldValidation, ValidationResult } from 'validations-lib';

const result: ValidationResult = Validation.validate(new FieldValidation(question));
```

---

## 🧱 The field object

| Property       | What it is                                  | Default        |
| -------------- | ------------------------------------------- | -------------- |
| `title`        | Field name, used in generated messages       | `''`           |
| `type`         | Which rule engine handles it (table below)   | `text`         |
| `condition`    | The rule itself (`gt`, `between`, …)         | `''`           |
| `currentValue` | The value under test                         | `''`           |
| `params`       | What to compare against, 1–2 entries         | `[]`           |
| `message`      | Your message; omit for a generated one       | auto-generated |
| `required`     | Empty value fails outright                   | `false`        |
| `uid`          | Identity — needed for groups & cross-refs    | `''`           |
| `format`       | Date/time parsing format (moment syntax)     | per type       |
| `code`         | Your own failure code, instead of the generated one | per condition |

Two rules worth internalizing:

- **One param = one bound.** Two params = a range, so `between` / `notBetween` need both.
- **Nothing to compare against = pass.** Missing `condition` or empty `params` returns `{result: true, message: ''}`. The library never invents a failure it can't justify — unlike that one regex in your codebase nobody dares touch. 🕸️

### 🏷️ Types

| Type                   | Compares                                                     |
| ---------------------- | ------------------------------------------------------------ |
| `text`                 | String **length** for numeric conditions, string content for the text-only ones |
| `number`               | Numeric value (`currency`, `percentage`, `scientific`, `exponential` share this engine) |
| `multiselect-dropdown` | Number of selected elements                                   |
| `checkbox`             | Checked count                                                 |
| `date`                 | `MM/DD/YYYY` (moment)                                         |
| `time`                 | `HH:mm`                                                       |
| `datetime`             | `MM/DD/YYYY, HH:mm`                                           |
| `dateRange`            | `[from, to]` — **both** ends must satisfy the condition        |
| `timeRange`            | `[from, to]`                                                  |
| `dateTimeRange`        | `[from, to]`                                                  |

Ranges also accept the nested form `[[from], [to]]`, because some date pickers emit that and arguing with a date picker is a fight nobody wins. 📅🥊

### ⚖️ Conditions

| Condition                                                        | Works on               |
| ---------------------------------------------------------------- | ---------------------- |
| `gt` `lt` `gte` `lte` `eq` `notEqual`                             | every type             |
| `between` `notBetween`                                            | every type (ranges compare both endpoints) |
| `sameAs` `notSame` `contains` `notContains` `startwith` `endswith` | `text` only            |
| `matches` `notMatches`                                            | `text` only (regex)    |
| `notBlank`                                                        | `text` only (no params) |

> ⚠️ Careful: on `text`, `gt` means *longer than*, not *alphabetically after*. `"zebra"` is not greater than `"apple"` here; it is merely one character longer. `sameAs` is the one that compares the actual string.

### 🔤 Regex conditions

Pass a pattern string (with optional flags as the second param) or a `RegExp`:

```js
Validation.validate({
  title: 'Email',
  type: 'text',
  condition: 'matches',
  currentValue: 'user@example.com',
  params: ['^[^@\\s]+@[^@\\s]+\\.[a-z]+$']
});
// => { result: true, message: '' }
```

`params: [/^\d+$/]` works too, and `notMatches` is the inverse — handy for banning patterns rather than requiring them.

### 🧩 Several conditions on one field

`condition` also takes an array. Each condition gets its own slot in `params`, paired by index, and the **first failure is what you get back** — so order them the way you'd want them reported.

```js
Validation.validate({
  title: 'Password',
  type: 'text',
  condition: ['gte', 'matches'],   // at least 8 characters, and contains a digit
  params: [[8], ['\\d']],
  currentValue: 'abcdefgh1'
});
// => { result: true, message: '' }
```

### 🌍 Date formats

Date and time types no longer assume American ordering. Set `format` per field — any moment format string:

```js
Validation.validate({
  title: 'Start',
  type: 'date',
  format: 'DD/MM/YYYY',
  condition: 'lt',
  currentValue: '03/01/2024',   // 3 January, not 1 March
  params: ['02/02/2024']
});
```

Defaults stay as they were (`MM/DD/YYYY`, `HH:mm`, `MM/DD/YYYY, HH:mm`), so existing fields are unaffected. Values are parsed with the field's own format first, then ISO, then anything else — no more moment fallback warnings.

### 🏷️ Error codes

Every failure carries a stable `code` alongside the message — the thing you actually key translations off, rather than string-matching English:

```js
Validation.validate({ title: 'Age', type: 'number', condition: 'gte', currentValue: 15, params: [18] });
// => { result: false, message: 'Age must be greater than or equal to 18', code: 'GTE_ERROR' }
```

Codes are the condition name in upper snake case plus `_ERROR` (`GTE_ERROR`, `NOT_BETWEEN_ERROR`, `MATCHES_ERROR`), plus `REQUIRED_ERROR` for empty values. Valid results carry `code: ''`. Set `code` on a field to use your own instead.

### 🔍 Checking your schema

`validate()` passes when it can't evaluate a field — better than inventing a failure, but it means a typo'd config silently validates everything. `Validation.check()` shows you those:

```js
Validation.check({ title: 'Age', type: 'number', condition: 'gte', params: ['eighteen'] });
// => [{ code: 'INVALID_NUMBER_PARAM', message: "Age (gte): 'eighteen' is not a number" }]
```

Empty array means the field is evaluable. It catches unknown conditions for the type, missing bounds, regexes that won't compile, unreadable dates, and condition/param arrays that don't line up. Run it over your schema in a test and typos stop reaching production. 🔦

### 🚫 Blank values

`'   '` is not a value. Whitespace-only strings count as empty for `required`, and the `notBlank` condition (no params) rejects them anywhere else.

### 🗣️ Your own default messages

Per-field `message` is still the override of last resort, but if you want the *library's* wording changed globally — another language, another tone — register templates once:

```js
const { Messages } = require('validations-lib');

Messages.setMessages({
  gt: (question, params) => `${question.title} doit être supérieur à ${params[0]}`,
  required: (question) => `${question.title} est obligatoire`
});
```

Keyed by condition name, plus `required` for the empty-value case. A field's own `message` still wins. `Messages.reset()` puts the English back. 🇫🇷

---

## 👨‍👩‍👧‍👦 Many fields at once

Give every field a `uid`, hand over a values map, get a verdict per field plus one for the whole form.

```js
const schema = [
  { title: 'number 1', type: 'number', condition: 'between', params: [25, 30], uid: '#1', required: true },
  { title: 'number 2', type: 'number', condition: 'between', params: [25, 30], uid: '#2', required: true },
  { title: 'number 3', type: 'number', condition: 'between', params: [20, 30], uid: '#3', required: true }
];

const entry = { '#1': 1, '#2': 27, '#3': 40 };

Validation.validateWithGroup(entry, schema);
```

```js
{
  '#1': { result: false, message: 'number 1 must be between 25 to 30' },
  '#2': { result: true,  message: '' },
  '#3': { result: false, message: 'number 3 must be between 20 to 30' },
  result: false        // true only when every field passed
}
```

`validateWithGroup` also digs through nested schemas — `blocks`, `sections`, `fields` — so you can pass the form definition you already have instead of flattening it first.

### 🔗 Fields that compare to other fields

Put a `uid` where a number would go. It's resolved from the entry map at validation time.

```js
{
  title: 'number 4',
  type: 'number',
  condition: 'between',
  params: [25, '#3'],   // upper bound = whatever #3 currently holds
  uid: '#4'
}
```

That's how "end date must be after start date" stops being 40 lines of special-case code with a `// TODO: refactor` from 2017 on top. 🪦

### 👆 Only validating what's been touched

```js
Validation.validateWithGroup(entry, schema, { '#1': true, '#2': false });
```

Untouched fields report `{result: true, message: ''}` — no shouting at the user about a field they haven't reached yet. Nobody likes being told they're wrong about something they haven't done.

---

## 🎯 Params, one at a time

When min and max arrive from different places, don't build the array by hand:

```ts
const field = new FieldValidation(question);
field.setParams(25);   // min
field.setParams(30);   // max
field.setInput('27');
```

---

## 🙋 FAQ

**Why not zod / yup / joi?**
Because your form config already lives in a database as JSON, and turning JSON into a chained builder at runtime is how people end up writing `eval`. Here the config *is* the API.

**`params` holds a max of two values. Why?**
Because a condition with three bounds is two conditions wearing a trench coat. 🕵️

**It said my field is valid but I'm sure it isn't.**
Check `condition` and `params`. Empty either one and validation passes by design — see the rule above. It's a feature, delivered with a straight face.

---

## 📬 Contributing / requirements

Issues and mail both work: <saurabhrathod35@gmail.com>. Bug reports with a reproducing field object get fixed first; bug reports saying "doesn't work" get a thoughtful stare. 🧐

Repo: https://github.com/saurabhrathod35/validations-lib
