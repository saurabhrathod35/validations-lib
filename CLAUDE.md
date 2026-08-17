# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build     # tsc -> lib/ (js + .d.ts), also runs on `npm install` via prepare
npm run format    # prettier --write on src/**/*.{ts,js}
npm run lint      # tslint -p tsconfig.json
```

Caveats (broken tooling — fix before relying on it):
- No `test` script. `src/__tests__/Greeter.test.ts` is a jest test, but jest is not a dependency and `tsconfig.json` excludes `**/__tests__/*`. To run tests you must add jest + ts-jest and a `test` script first.
- `lint` calls `tslint`, which is not in devDependencies.
- `start` runs `node index.js`, which does not exist.

Publishing: `npm version <x>` runs lint -> format -> commit src -> `git push && git push --tags` (see the `pre/postversion` scripts). Only `lib/**/*` is published.

## Architecture

TypeScript library compiled to CommonJS (`lib/index.js`, types `lib/index.d.ts`). Public surface is `src/index.ts`: `Validation` and `FieldValidation`.

Flow — every validation goes through the same three steps:

1. **Normalize** — `FieldValidation` (`src/model/field.model.ts`) takes an arbitrary caller "question" object and flattens it to `{title, type, condition, currentValue, message, params, required, uid}`. It accepts two shapes: the flat README shape, and a nested `question.validation.condition.{type,message,min,max}` shape (an Angular-form-ish schema). `currentValue` can also come from a passed-in `group` (plain map or Angular `group.controls[uid].value`).
2. **Dispatch by type** — `Validation.getInstance` (`src/validation.ts`) maps `question.type` to a service in `src/services/`. Default (unknown type) is `TextValidation`. Date/time services also receive the moment format string here — that switch is the single place display/parse formats are decided (`MM/DD/YYYY`, `HH:mm`, etc.).
3. **Dispatch by condition** — `Validation.validate` calls `instance[question.condition](currentValue, params)` — the condition name is invoked as a method by string. So **adding a condition means adding an identically-named method to every service that should support it**; the service classes share no base class or interface, only this duck-typed method-name contract (`gt/lt/eq/lte/gte/notEqual/between/notBetween`, plus text-only `sameAs/notSame/contains/notContains/startwith/endswith`).

Every condition method returns `{result: boolean, message: string}`, falling back to a generated message when `question.message` is empty. Guard rails short-circuit before dispatch: `required` + empty value returns `ValidationUtils.isRequired`, and missing/empty `params` or missing `condition` returns `{result: true, message: ''}` (validation passes when it cannot be evaluated).

### Group validation

`Validation.validateWithGroup(entries, schema, touchedFields?)` validates many fields at once. `ValidationUtils.getFieldsByType` flattens a nested schema (`blocks` / `sections` / `fields`, or a plain array) into a flat field list. `ValidationUtils.makeSimpleQuestion` then builds each `FieldValidation` and appends `min`/`max` params — when `condition[type].type === 'field'`, the param value is looked up in `entries` by uid, which is how "compare with another question" (`params: [25, '#3']`) works. Result is keyed by uid plus an aggregate boolean under `result`.

### Range types

`dateRange`/`timeRange`/`dateTimeRange` take array values `[a, b]` and compare both endpoints against `compareWith`. `ValidationUtils.fieldBifurcation` un-nests `[[a],[b]]` into `[a,b]` (via a JSON string-replace hack). `compareWith[1]` falls back to `compareWith[0]` when only one bound is given.

## Conventions

- `strict: false` — `any` is used liberally; keep new code consistent rather than adding strict-mode plumbing.
- Behavior and the README are tightly coupled: README documents the supported type/condition matrix. Update it when adding either.
