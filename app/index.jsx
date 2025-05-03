import React, { useState } from 'react';
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];  
  const [animatedDef, setAnimatedDef] = useState('');


  const fetchDefinition = async () => {
    if (!term.trim()) {
      setError('Please enter a word to search');
      return;
    }
    setLoading(true);
    setError('');
    setDefinition('');
    setSynonyms([]);
    setLoading(true);

    fadeAnim.setValue(0);

    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
        const data = await res.json();
    
        if (res.ok) {
          if (data.length > 0) {
            const meaning = data[0].meanings[0];
            const fullDef = meaning.definitions[0].definition;
            setDefinition(fullDef);       
            setAnimatedDef('');            
            let index = 0;
            const interval = setInterval(() => {
              setAnimatedDef(prev => prev + fullDef.charAt(index));
              index++;
              if (index >= fullDef.length) {
                clearInterval(interval);
              }
            }, 30); 

            setSynonyms(meaning.definitions[0].synonyms || []);
            
          
            if (!global.__TEST__) {
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
              }).start();
            }
          } else {
            setError('Term not found');
          }
          
        } else {
          setError('Term not found');
        }
      } catch (err) {
        setError('Network error',err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.main_container}>
      <View style={styles.heading}>
        <Text style={styles.headingtext}>Dictionary App</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a term"
          value={term}
          onChangeText={setTerm}
        />
        <Pressable
          onPress={fetchDefinition}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        
        {loading && 
          <ActivityIndicator 
            testID="loading" 
            size="large" 
            color="#007AFF" 
            style={styles.loader} 
          />
        }

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {definition !== '' && (
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <Text style={styles.definition}>{animatedDef}</Text>
            {synonyms.length > 0 && (
              <View style={styles.synonymContainer}>
              <Text style={styles.synonymsLabel}>Synonyms:</Text>
              <View style={styles.synonymList}>
                {synonyms?.map(s => (
                  <Text key={s} style={styles.synonymBadge}>{s}</Text>
                ))}
              </View>
            </View>

            )}
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    position: 'absolute',  
    top: 5,  
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#007AFF',
  },
  headingtext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007AFF',
    fontFamily: 'Arial',  
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    padding: 20,
    alignItems: 'center',  
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: '#007AFF', 
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Arial',  
    width: '100%', 
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    width: '100%', 
  },
  definition: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Arial', 
  },
  synonyms: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Arial',  
  },
  synonymContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  synonymsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007AFF',
  },
  synonymList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  synonymBadge: {
    backgroundColor: '#e0f0ff',
    color: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },  
  highlight: {
    fontWeight: 'bold',
    color: '#FF6347',  
  },
  loader: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPressed: {
    backgroundColor: '#005BBB',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },  
});
