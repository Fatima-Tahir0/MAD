import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { Screen, SectionTitle } from '../components/UI';

const categoryContent = {
  Accessories: {
    eyebrow: 'THE FINISHING TOUCHES',
    headline: 'Small details, big impact.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1000',
    description: 'Explore pieces that complete your everyday look.',
    groups: [{ title: 'Male', subs: ['Purses / Wallets', 'Watches'] }, { title: 'Female', subs: ['Jewellery', 'Purses'] }]
  },
  Clothes: {
    eyebrow: 'YOUR WARDROBE EDIT',
    headline: 'Wear your own story.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000',
    description: 'Find everyday staples and timeless outfits.',
    groups: [{ title: 'Male', subs: ['Stitched', 'Unstitched'] }, { title: 'Female', subs: ['Stitched', 'Unstitched'] }]
  },
  Makeup: {
    eyebrow: 'YOUR EVERYDAY GLOW',
    headline: 'Makeup, thoughtfully chosen.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000',
    description: 'Shop a makeup-only collection. The required Fake Store API catalog is fetched separately and never mixed into these products.',
    groups: [{ title: 'All', subs: ['All Makeup'] }]
  }
};

export default function CategoryScreen({ route, navigation }) {
  const title = route.params?.title;
  if (!title) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.indexContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.indexHeading}>Explore Categories</Text>
          <Text style={styles.description}>Discover thoughtfully chosen finds for every part of your style.</Text>
          {Object.entries(categoryContent).map(([category, data]) => (
            <TouchableOpacity
              key={category}
              activeOpacity={0.88}
              style={styles.indexCard}
              onPress={() => navigation.navigate('Category', { title: category })}
            >
              <Image source={{ uri: data.image }} style={styles.indexImage} />
              <View style={styles.indexCardCopy}>
                <Text style={styles.subTitle}>{category}</Text>
                <Text style={styles.subDesc}>{data.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={19} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Screen>
    );
  }
  const data = categoryContent[title] || categoryContent.Accessories;
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: data.image }} style={styles.hero} />
        <Text style={styles.eyebrow}>{data.eyebrow}</Text>
        <Text style={styles.headline}>{data.headline}</Text>
        <Text style={styles.description}>{data.description}</Text>
        {data.groups.map(group => (
          <View key={group.title} style={styles.group}>
            <SectionTitle title={group.title} />
            {group.subs.map((sub, index) => (
              <TouchableOpacity key={sub} activeOpacity={0.85} style={styles.subCard} onPress={() => navigation.navigate('Subcategory', { title: sub, parent: title, gender: group.title })}>
                <View style={styles.subIcon}><Ionicons name={title === 'Clothes' ? 'shirt-outline' : title === 'Makeup' ? 'color-palette-outline' : index === 0 ? 'bag-outline' : 'watch-outline'} size={22} color={COLORS.primary} /></View>
                <View style={{ flex: 1 }}><Text style={styles.subTitle}>{sub}</Text><Text style={styles.subDesc}>Explore the collection</Text></View>
                <Ionicons name="chevron-forward" size={19} color={COLORS.primary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  indexContent: { padding: 18, paddingBottom: 30 },
  indexHeading: { color: COLORS.text, fontSize: 25, fontWeight: '800', marginBottom: 7 },
  indexCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, marginTop: 12 },
  indexImage: { width: 76, height: 76, borderRadius: 10, backgroundColor: COLORS.secondary },
  indexCardCopy: { flex: 1 },
  content: { padding: 18, paddingBottom: 30 },
  hero: { width: '100%', height: 185, borderRadius: 16, backgroundColor: COLORS.secondary },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 2, marginTop: 19 },
  headline: { color: COLORS.text, fontSize: 25, fontWeight: '700', marginTop: 7 },
  description: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 12 },
  group: { marginTop: 10 },
  subCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, backgroundColor: '#FFFFFF', borderRadius: 13, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10 },
  subIcon: { width: 46, height: 46, borderRadius: 12, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  subTitle: { color: COLORS.text, fontSize: 14, fontWeight: '800' },
  subDesc: { color: COLORS.muted, fontSize: 11, marginTop: 4 }
});
