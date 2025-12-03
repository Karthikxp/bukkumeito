import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Push Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: '#007AFF' }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#767577', true: '#007AFF' }}
                thumbColor={darkModeEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Location Services</Text>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#767577', true: '#007AFF' }}
                thumbColor={locationEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Manage Subscription</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Data & Privacy</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Delete Account</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Contact Us</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Report a Bug</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Rate the App</Text>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});

export default SettingsScreen;
