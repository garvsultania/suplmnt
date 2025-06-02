# Suplmnt - Supplement Management App

A modern, user-friendly application for managing and tracking supplements with a beautiful glass-morphism UI design.

## Features

- **Supplement Overview**: Detailed view of supplement information with a modern glass-morphism design
- **Dosage Tracking**: Track your supplement intake and set reminders
- **Interaction Warnings**: Stay informed about potential supplement interactions
- **Benefits & Side Effects**: Comprehensive information about supplement effects
- **Dietary Information**: Track allergens and dietary restrictions

## Component Structure

### Supplement Overview

The main component that displays all supplement information in a card-based layout:

```tsx
<SupplementOverview
  name="Omega-3 Fish Oil"
  dosage={{
    amount: "1000 mg",
    frequency: "Twice daily",
    form: "Softgel capsule",
    storage: "Store in a cool, dry place"
  }}
  benefits={[
    "Supports heart health",
    "Promotes brain function",
    "May reduce inflammation"
  ]}
  sideEffects={[
    "Fishy aftertaste",
    "Mild digestive discomfort"
  ]}
  interactions={[
    "May interact with blood-thinners",
    "Consult doctor if on blood pressure medication"
  ]}
  dietaryInfo={{
    activeIngredients: ["EPA 300 mg", "DHA 200 mg"],
    source: "Molecularly distilled fish oil",
    allergens: ["Fish (anchovy, sardine)"],
    capsuleSize: "Large softgel"
  }}
/>
```

### Individual Cards

The overview is composed of several specialized card components:

#### DosageInfoCard
```tsx
<DosageInfoCard
  amount="1000 mg"
  frequency="Twice daily"
  form="Softgel capsule"
  storage="Store in a cool, dry place"
/>
```

#### BenefitsCard
```tsx
<BenefitsCard
  benefits={[
    "Supports heart health",
    "Promotes brain function",
    "May reduce inflammation"
  ]}
/>
```

#### SideEffectsCard
```tsx
<SideEffectsCard
  sideEffects={[
    "Fishy aftertaste",
    "Mild digestive discomfort"
  ]}
/>
```

#### InteractionWarningsCard
```tsx
<InteractionWarningsCard
  interactions={[
    "May interact with blood-thinners",
    "Consult doctor if on blood pressure medication"
  ]}
/>
```

## Design Guidelines

### Card Styling
- All cards use the `card-glass` class for consistent glass-morphism effect
- Cards have a subtle drop-shadow (`shadow-glass-sm`)
- Border radius of 16px (`rounded-card`)
- Consistent spacing between cards (`mb-4`)
- Internal padding of `px-4 py-4`

### Color Scheme
- **Primary**: Mint (#4ECDC4) for benefits and general information
- **Warning**: Red (#FF6B9D) for side effects and warnings
- **Caution**: Yellow (#FFE66D) for interactions and contraindications

### Typography
- Headers: `font-inter font-semibold text-base`
- Body text: `font-inter text-sm`
- Dosage values: `font-inter font-bold text-lg`

### Icons
- Benefits: CheckCircle icon in mint color
- Warnings: AlertTriangle icon in red
- Interactions: AlertTriangle icon in yellow
- General info: Info icon in mint

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
