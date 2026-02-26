# FMG Admin Color Guide

## Brand Colors

- **FMG Gold**: `#BE9F44`
- **FMG Blue**: `#29377E`
- **Background**: `#edf2f9`

## Button Colors

### Filled Variant (Primary Actions)

```css
/* Gold Filled Button */
variant="filled" bgColor="#BE9F44" color="white"
hover:bg-[#a67c3a] text-white
active:bg-[#8b6530] text-white
disabled:bg-[#dae4f5] text-[#9da9bb]

/* Blue Filled Button */
variant="filled" bgColor="#29377E" color="white"
hover:bg-[#1e2a66] text-white
active:bg-[#141f4f] text-white
disabled:bg-[#dae4f5] text-[#9da9bb]

/* Success Filled Button */
variant="filled" bgColor="#10b981" color="white"
hover:bg-[#059669] text-white

/* Warning Filled Button */
variant="filled" bgColor="#f59e0b" color="white"
hover:bg-[#d97706] text-white

/* Danger Filled Button */
variant="filled" bgColor="#ef4444" color="white"
hover:bg-[#dc2626] text-white
```

### Outlined Variant (Secondary Actions)

```css
/* Gold Outlined Button */
variant="outlined" color="#BE9F44"
bg-transparent text-[#BE9F44] border border-[#BE9F44]
hover:bg-[#BE9F44] hover:text-white
active:bg-[#a67c3a] active:text-white

/* Blue Outlined Button */
variant="outlined" color="#29377E"
bg-transparent text-[#29377E] border border-[#29377E]
hover:bg-[#29377E] hover:text-white
active:bg-[#1e2a66] active:text-white

/* Success Outlined Button */
variant="outlined" color="#10b981"
bg-transparent text-[#10b981] border border-[#10b981]
hover:bg-[#10b981] hover:text-white

/* Warning Outlined Button */
variant="outlined" color="#f59e0b"
bg-transparent text-[#f59e0b] border border-[#f59e0b]
hover:bg-[#f59e0b] hover:text-white

/* Danger Outlined Button */
variant="outlined" color="#ef4444"
bg-transparent text-[#ef4444] border border-[#ef4444]
hover:bg-[#ef4444] hover:text-white

/* Neutral Outlined Button */
variant="outlined" color="#5e6382"
bg-transparent text-[#5e6382] border border-[#dae4f5]
hover:bg-[#f9fafd] hover:text-[#25303d]
```

### Status/Action Button Colors

```css
/* Success Actions */
bg-[#10b981] text-white
hover:bg-[#059669] text-white

/* Warning Actions */
bg-[#f59e0b] text-white
hover:bg-[#d97706] text-white

/* Danger/Delete Actions */
bg-[#ef4444] text-white
hover:bg-[#dc2626] text-white
```

## Text Colors

### Text Hierarchy

```css
/* Primary heading text */
text-[#25303d]

/* Secondary/body text */
text-[#5e6382]

/* Muted/helper text */
text-[#9da9bb]

/* Disabled text */
text-[#c3d4ea]

/* Brand accent text */
text-[#BE9F44]  /* Gold */
text-[#29377E]  /* Blue */
```

### Link Colors

```css
/* Default links */
text-[#29377E]
hover:text-[#BE9F44]

/* Visited links */
text-[#1e2a66]

/* Active links */
text-[#BE9F44]
```

## Background Colors

### Page/Section Backgrounds

```css
/* Main background (current) */
bg-[#edf2f9]

/* Card/content backgrounds */
bg-[#f9fafd]  /* Light variant */
bg-white      /* Pure white for cards */

/* Hover states for interactive areas */
hover:bg-[#f8fafc]

/* Selected/active states */
bg-[#fef3c7]  /* Light gold tint */
bg-[#f0f4ff]  /* Light blue tint */
```

### Field Component Colors

```css
/* Outlined Field (Default) */
variant="outlined"
bg-white text-[#9f9fa9] border border-[#e4e4e7]

/* Filled Field (Default) */
variant="filled" bgColor="#f4f4f5"
bg-[#f4f4f5] text-[#9f9fa9] border-none

/* Custom Colors */
variant="outlined" color="#25303d"
variant="filled" bgColor="#fef3c7" /* Light gold background */
variant="filled" bgColor="#f0f4ff" /* Light blue background */

/* States (combine with Tailwind classes) */
/* Focused Field */
className="focus:border-[#BE9F44] focus:ring-2 focus:ring-[#fef3c7]"

/* Error Field */
className="border-error-400 ring-2 ring-red-100"

/* Disabled Field */
variant="filled" bgColor="#f8fafc" color="#9da9bb"
```

## Navigation Colors

### Sidebar Navigation

```css
/* Active nav item (current) */
text-[#25303d]

/* Inactive nav item (current) */
text-[#5e6382]
hover:text-[#25303d]

/* Sub-navigation (current) */
text-[#80849b]
hover:text-[#25303d]

/* Section labels (current) */
text-[#9da9bb]
```

## Component Examples

### Button Examples

```tsx
// Filled Variant Buttons
<Button variant="filled" bgColor="#BE9F44" size="medium">
  Save Changes
</Button>

<Button variant="filled" bgColor="#29377E" size="medium">
  Login
</Button>

<Button variant="filled" bgColor="#10b981" size="medium">
  Approve
</Button>

<Button variant="filled" bgColor="#ef4444" size="medium">
  Delete
</Button>

<Button variant="filled" bgColor="#f59e0b" size="medium">
  Warning Action
</Button>

// Outlined Variant Buttons
<Button variant="outlined" color="#BE9F44" size="medium">
  Cancel
</Button>

<Button variant="outlined" color="#29377E" size="medium">
  More Info
</Button>

<Button variant="outlined" color="#10b981" size="medium">
  Secondary Action
</Button>

<Button variant="outlined" color="#ef4444" size="medium">
  Remove
</Button>

// Button Sizes
<Button variant="filled" bgColor="#BE9F44" size="small">
  Small
</Button>

<Button variant="filled" bgColor="#BE9F44" size="medium">
  Medium
</Button>

<Button variant="filled" bgColor="#BE9F44" size="large">
  Large
</Button>

// Rounded Buttons
<Button variant="filled" bgColor="#BE9F44" isRounded>
  Rounded Button
</Button>

// Full Width
<Button variant="filled" bgColor="#29377E" fullWidth>
  Full Width Button
</Button>
```

### Text Examples

```tsx
// Headings
<h1 className="text-[#25303d] text-2xl font-bold">Page Title</h1>
<h2 className="text-[#5e6382] text-lg font-semibold">Section Title</h2>

// Body text
<p className="text-[#5e6382]">Regular content text</p>
<span className="text-[#9da9bb] text-sm">Helper text</span>

// Links
<a className="text-[#29377E] hover:text-[#BE9F44]">Learn more</a>

// Brand accent text
<span className="text-[#BE9F44]">FMG</span>
<span className="text-[#29377E]">Admin</span>
```

### Field Examples

```tsx
// Outlined Fields (Default)
<Field variant="outlined" placeholder="Enter text" />

<Field variant="outlined" placeholder="Search..." isRounded />

// Filled Fields
<Field variant="filled" bgColor="#f4f4f5" placeholder="Filled input" />

<Field variant="filled" bgColor="#fef3c7" placeholder="Gold background" />

// Field with custom styling
<Field
  variant="outlined"
  color="#25303d"
  placeholder="Custom color text"
  isRounded
/>

// Different field states (using Tailwind for focus, error states)
<div className="space-y-2">
  <Field
    variant="outlined"
    placeholder="Normal state"
    className="focus:border-[#BE9F44] focus:ring-2 focus:ring-[#fef3c7]"
  />

  <Field
    variant="outlined"
    placeholder="Error state"
    className="border-error-400 ring-2 ring-red-100"
  />

  <Field
    variant="filled"
    bgColor="#f8fafc"
    placeholder="Disabled state"
    color="#9da9bb"
    disabled
  />
</div>
```

### Card/Container Examples

```tsx
// Main content card
<div className="bg-white border border-[#dae4f5] rounded-lg p-4">
  <h3 className="text-[#25303d] font-semibold">Card Title</h3>
  <p className="text-[#5e6382]">Card content</p>
</div>

// Highlighted card
<div className="bg-[#f9fafd] border border-[#dae4f5] rounded-lg p-4">
  Content here
</div>

// Interactive card
<div className="bg-white border border-[#dae4f5] hover:bg-[#f8fafc] rounded-lg p-4 cursor-pointer">
  Clickable content
</div>
```

### Form Examples

```tsx
// Input field
<input className="bg-white text-[#25303d] border border-[#dae4f5] focus:border-[#BE9F44] focus:ring-2 focus:ring-[#fef3c7] px-3 py-2 rounded" />

// Error input
<input className="bg-white text-[#25303d] border border-error-400 ring-2 ring-red-100 px-3 py-2 rounded" />

// Label
<label className="text-[#25303d] font-medium">Field Label</label>

// Helper text
<span className="text-[#9da9bb] text-sm">Helper text goes here</span>

// Error text
<span className="text-error-400 text-sm">Error message here</span>
```

## Quick Reference

### Most Used Combinations

#### Button Variants

- **Primary Gold Filled**: `variant="filled" bgColor="#BE9F44"`
- **Primary Blue Filled**: `variant="filled" bgColor="#29377E"`
- **Gold Outlined**: `variant="outlined" color="#BE9F44"`
- **Blue Outlined**: `variant="outlined" color="#29377E"`
- **Success Action**: `variant="filled" bgColor="#10b981"`
- **Danger Action**: `variant="filled" bgColor="#ef4444"`

#### Field Variants

- **Outlined Field**: `variant="outlined"`
- **Filled Field**: `variant="filled" bgColor="#f4f4f5"`
- **Rounded Field**: `variant="outlined" isRounded`

#### Common Styles

- **Card Background**: `bg-white border border-[#dae4f5]`
- **Page Background**: `bg-[#edf2f9]`
- **Primary Text**: `text-[#25303d]`
- **Secondary Text**: `text-[#5e6382]`
- **Muted Text**: `text-[#9da9bb]`
- **Links**: `text-[#29377E] hover:text-[#BE9F44]`

### Color Palette Summary

```
Gold Shades:
- #BE9F44 (Primary)
- #a67c3a (Hover)
- #8b6530 (Active)
- #fef3c7 (Light bg)

Blue Shades:
- #29377E (Primary)
- #1e2a66 (Hover)
- #141f4f (Active)
- #f0f4ff (Light bg)

Neutrals:
- #25303d (Dark text)
- #5e6382 (Medium text)
- #9da9bb (Light text)
- #dae4f5 (Borders)
- #edf2f9 (Background)
- #f9fafd (Card bg)
- #ffffff (Pure white)

Status:
- #10b981 (Success)
- #f59e0b (Warning)
- #ef4444 (Error)
```
