# 💱 TapTap Send Currency Converter

A modern, feature-rich currency converter with real-time exchange rates, bidirectional conversion, and comprehensive URL parameter support.

**🌐 Live Demo**: [taptap-rates.pages.dev](https://taptap-rates.pages.dev)

## 🌟 Why This Currency Converter is Better

### � Bidirectional Currency Conversion

Unlike traditional converters, this app supports **true bidirectional conversion**:

- ✅ **Input in either field** - Enter amounts in "From" OR "To" currency
- ✅ **Real-time calculation** in both directions
- ✅ **Smart rate display** shows exchange rates for both directions
- ✅ **Seamless experience** - no need to manually swap currencies

### 🔗 Advanced URL Parameter Support

**Query Parameters** with full state synchronization:

- **Currency Selection**: `?from=aed&to=bdt`
- **Amount Included**: `?from=usd&to=eur&amount=100`
- **Real-time Updates**: URL automatically updates as you interact

**Example URLs:**

```
https://taptap-rates.pages.dev/?from=aed&to=bdt&amount=500
https://taptap-rates.pages.dev/?from=usd&to=eur&amount=1000
https://taptap-rates.pages.dev/?from=gbp&to=jpy&amount=250
```

This makes it perfect for:

- ✅ **Bookmarking** specific currency pairs with amounts
- ✅ **Direct linking** to exact conversions
- ✅ **API integration** and automation
- ✅ **Social sharing** of specific rates and amounts

### 🎨 Modern Features

#### 🌓 Smart Theme Detection

- **System Theme Detection** - Automatically detects your OS theme preference
- **Light & Dark Mode** toggle with smooth transitions
- **Persistent theme** preference (saved in localStorage)
- **Modern gradient backgrounds** and animations

#### 💫 Enhanced User Experience

- **Bidirectional conversion** - Input amounts in either currency field
- **Real-time conversion** as you type in any field
- **Currency swap** button for quick reversal
- **Smart URL updates** - Bookmarkable states with amounts
- **Responsive design** for all devices
- **Loading states** and comprehensive error handling
- **Clean, intuitive interface** with modern design

#### ⚡ Performance

- **Fast API** with real-time exchange rates
- **Efficient caching** for better performance
- **Lightweight** and fast loading

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Internet connection for live exchange rates

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start converting currencies!

### Usage Examples

#### Basic Usage

1. Enter an amount in either the "From" OR "To" field
2. Select source and target currencies
3. See the converted amount instantly in both directions
4. URL automatically updates with your current state

#### URL Parameters

- **With Amount**: `?from=usd&to=eur&amount=100`
- **Currency Only**: `?from=gbp&to=jpy`
- **Bookmarkable**: Save specific conversions for later

#### Bidirectional Conversion

- **Forward**: Enter amount in "From" field → "To" field updates
- **Reverse**: Enter amount in "To" field → "From" field updates
- **Smart Display**: Exchange rates shown for both directions

#### Theme Switching

- **Auto-detect**: Follows your system theme preference on first visit
- **Manual Toggle**: Click the theme button (🌙/☀️) to override
- **Persistent**: Your preference is automatically saved

## 🛠 Technical Features

### API Integration

- **Real-time exchange rates** from TapTap Send API
- **Comprehensive error handling** for network issues
- **Loading indicators** for better UX
- **Smart caching** for optimal performance

### Advanced Functionality

- **Bidirectional calculation** - Convert in both directions
- **URL state management** - Shareable and bookmarkable links
- **System theme detection** - Automatic dark/light mode
- **Query parameter synchronization** - Real-time URL updates

### Code Architecture

- **Modular JavaScript** with separate classes for themes and conversion
- **Clean HTML structure** with semantic elements and comprehensive meta tags
- **CSS custom properties** for easy theming and consistency
- **Progressive enhancement** approach for maximum compatibility

### Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Touch-friendly interface

## 🎯 Comparison with Standard Converters

| Feature                 | This Converter           | Standard Converters   |
| ----------------------- | ------------------------ | --------------------- |
| Bidirectional Input     | ✅ Both Fields Editable  | ❌ One Direction Only |
| URL Parameter Support   | ✅ Full Support + Amount | ❌ No Support         |
| System Theme Detection  | ✅ Auto-detect + Toggle  | ❌ Fixed Theme        |
| Real-time Rate Updates  | ✅ Live TapTap Data      | ⚠️ Limited Sources    |
| Mobile Optimization     | ✅ Touch Optimized       | ⚠️ Basic              |
| Currency Swap           | ✅ One Click             | ❌ Manual Process     |
| Bookmarkable States     | ✅ With Amounts          | ❌ No State Saving    |
| Modern UI/UX            | ✅ Gradients/Animations  | ❌ Basic Styling      |
| Comprehensive Meta Tags | ✅ SEO Optimized         | ❌ Minimal            |

## 📱 Mobile Features

- **Touch-optimized** controls
- **Responsive** layout adapts to screen size
- **Large** touch targets for better usability
- **Portrait/landscape** support

## 🔧 Customization

The converter is highly customizable:

- **CSS variables** for easy color theming
- **Modular JavaScript** for feature additions
- **API endpoint** can be easily changed
- **Currency list** automatically updates

## 🌐 Browser Testing

Tested on:

- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Future Enhancements

- [ ] Historical rate charts and trends
- [ ] Favorite currency pairs with quick access
- [ ] Rate alerts and notifications
- [ ] Offline mode with cached rates
- [ ] Multiple theme options (not just light/dark)
- [ ] Calculator-style number input
- [ ] Rate comparison across multiple providers

## 👨‍💻 Developer

**Created by**: [Anwarul Islam](https://anwarulislam.github.io)  
**Live Demo**: [taptap-rates.pages.dev](https://taptap-rates.pages.dev)  
**API**: TapTap Send Exchange Rates

## 🤝 Contributing

Feel free to contribute by:

1. **Reporting bugs** or issues
2. **Suggesting new features** or improvements
3. **Submitting pull requests** with enhancements
4. **Improving documentation** and examples
5. **Sharing feedback** on user experience

---

**Built with ❤️ for a better currency conversion experience**
